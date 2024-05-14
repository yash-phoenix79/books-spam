import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto {


    @ApiProperty({ 
        type:String,
        required: true,
        description: 'The title of your book',
    })
    title:string;

    @ApiProperty({ 
        type:String,
        required: false,
        description: 'Give me some description',
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
