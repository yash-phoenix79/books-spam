import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('books')
@ApiTags('books')
export class BooksController {
  private readonly logger = new Logger(BooksController.name);

  
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Book is saved.'})
  @ApiResponse({ status: 401, description: 'User not logged in.'})
  @ApiResponse({ status: 400, description: 'Bad Request / Data '})
  create(@Body() createBookDto: CreateBookDto) {
    this.logger.log(`Creating a book...`);
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Books are delivered.'})
  findAll() {
    this.logger.log(`Returning all Books...`);
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Book is retrieved.'})
  @ApiResponse({ status: 404, description: 'Book not found.'})
  @ApiParam({ name: 'id', description: 'give the id of book'})
  findOne(@Param('id') id: string) {
    this.logger.log(`Returning book by id`);
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Book is updated'})
  @ApiParam({ name: 'id', description: 'id of the book'})
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    this.logger.log(`Updating book by id`);
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Book is deleted.'})
  @ApiParam({ name: 'id', description: 'book ID'})
  remove(@Param('id') id: string) {
    this.logger.log(`Deleting book by id`);
    return this.booksService.remove(id);
  }
}
