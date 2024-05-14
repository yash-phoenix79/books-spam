import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private UserModel: Model<User>){

  }
  async create(createUserDto: CreateUserDto) {

    const isThere = await this.findUserByEmailExists(createUserDto.email);

    if(isThere){
      throw new BadRequestException(`The user with email "${createUserDto.email}" already exists.`);
    }

    const createdUser= new this.UserModel(createUserDto);
    return await createdUser.save();
  }
  async findUserByEmailExists(email: string) {
    this.logger.debug(`searching user with email ${email}`);
    const isThere = await this.UserModel.findOne({email: email});
    return Boolean(isThere);
  }

  findAll() {
    return this.UserModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
