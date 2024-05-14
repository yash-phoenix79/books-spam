import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    @ApiProperty({ 
        type:String,
        required: true,
        description: 'The title of your book',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    title:string;

    @ApiProperty({ 
        type:String,
        required: false,
        description: 'Add new description and content',
    })
    @IsString()
    description?:string;

    @ApiProperty({ 
        type:String,
        required: true,
        description: 'Whats the name of author',
    })
    @IsString()
    author: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @MaxLength(2000)
    pages: number;

}
