import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {

  private readonly logger = new Logger(BooksService.name);
  
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}
  
  async create(createBookDto: CreateBookDto):Promise<Book> {
    // return 'This action adds a new book';
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  async findAll():Promise<Book[]>{
    // return `This action returns all books`;
    return this.bookModel.find().exec();
  }

  async findOne(id: string):Promise<Book> {
    // return `This action returns a #${id} book`;
    try{
      const book=await this.bookModel.findById(id);
      if(!book){
        throw new NotFoundException(`Book not found with ID ${id}`);
      }
      return book;

    }catch(error){
      this.logger.error(`An error occurred in fetching book by Id ${id}. ${error?.message}`);
      throw error;
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    // return `This action updates a #${id} book`;
    try{
      const book=await this.bookModel.findById(id);
      if(!book){
        throw new NotFoundException(`Book not found with ID ${id}`);
      }
      const updated = await this.bookModel.findByIdAndUpdate(id, updateBookDto);
    return updated;
    }catch(error){
      this.logger.error(`An error occurred in updating book by Id ${id}. ${error?.message}`);
      throw error;
    }
  }

  async remove(id: string) {
    // return `This action removes a #${id} book !`;

    try{
      const book=await this.bookModel.findById(id);
      if(!book){
        throw new NotFoundException(`Book not found with ID ${id}`);
      }
      const deleted = await this.bookModel.findByIdAndDelete(id);
    return deleted;
    }catch(error){
      this.logger.error(`An error occurred in deleting book by Id ${id}. ${error?.message}`);
      throw error;
    }

  }
}
