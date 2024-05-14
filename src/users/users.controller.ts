import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()

  findAll() {
    return this.userService.findAll();
  }


  @Patch(':id')
  @ApiBearerAuth()

  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }


  @Delete(':id')
  @ApiBearerAuth()

  // @Roles(Role.Admin, Role.SuperAdmin, Role.Terminator)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}