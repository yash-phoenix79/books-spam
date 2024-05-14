import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginDto {

    @ApiProperty({ 
        type:String,
        required: true,
        description: 'The EMAIL of your account',
    })
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @ApiProperty({ 
        type:String,
        required: true,
        description: 'Give some password to your account',
    })
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(10)
    password:string;

}
