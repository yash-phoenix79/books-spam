import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    @ApiProperty({ 
        type:String,
        required: true,
        description: 'The title of your book',
    })
    title:string;

    @ApiProperty({ 
        type:String,
        required: false,
        description: 'Add new description and content',
    })
    description?:string;

    @ApiProperty({ 
        type:String,
        required: true,
        description: 'Whats the name of author',
    })
    author: string;

    @ApiProperty()
    pages: Number;

}
