import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
 
  constructor( @InjectModel(User.name) private UserModel: Model<User>){}

 
  async create(createUserDto: CreateUserDto) {
    const isThere = await this.findUserByEmailExists(createUserDto.email);
    if(isThere){
      throw new BadRequestException(`The user with email "${createUserDto.email}" already exists.`);
    }

    const createdBasicUser = new this.UserModel(createUserDto);
    return await createdBasicUser.save();
  }

  async findUserByEmail(email:string){
    this.logger.debug(`searching user with email ${email}`);
    return await this.UserModel.findOne({
      email: email
    });
  }

  async findUserByEmailExists(email:string){
    this.logger.debug(`searching user with email ${email}`);
    const isThere = await this.UserModel.findOne({
      email: email
    });
    return Boolean(isThere);
  }

  
  remove(id: string) {
    throw new Error('Method not implemented.');
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }


}