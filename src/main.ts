import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import compression from '@fastify/compress';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule,
    new FastifyAdapter({ logger: true }));

    
  // app.setGlobalPrefix('api');

  app.enableCors();

  await app.register(compression);

  const version='0.0.2';

    const config=  new DocumentBuilder()
    .setTitle('Books example')
    .setDescription('The Books API description')
    .setVersion(`${version}`)
    .addTag('books')
    .build();

    const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

    await app.listen(3001, '0.0.0.0');

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }

}
bootstrap();
