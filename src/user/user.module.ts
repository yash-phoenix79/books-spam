import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Module({
  imports: [
    JwtModule,
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: async() => {
          const schema = UserSchema;
          schema.pre('save', async function (next:any) {
            try {
              if (!this.isModified('password')) {
                return next();
              }
              // tslint:disable-next-line:no-string-literal
              const hashed = await bcrypt.hash(this['password'], 10);
              // tslint:disable-next-line:no-string-literal
              this['password'] = hashed;
              return next();
            } catch (err) {
              return next(err);
            }
        });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}