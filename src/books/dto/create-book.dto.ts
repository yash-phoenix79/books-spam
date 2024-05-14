import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Max, MaxLength } from "class-validator";

export class CreateBookDto {


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
        description: 'Give me some description',
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

    @ApiProperty({
        type:Number,
        required: true,
        description: 'How many pages are in the book',
    })
    @IsNumber()
    @IsNotEmpty()
    @Max(2000)
    pages: number;

}
