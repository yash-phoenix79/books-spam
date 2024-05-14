import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength, NotContains } from "class-validator";

export class LoginDto{

    @ApiProperty({
        type:String,
        required:true,
        description:"Enter your email"
    })
    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email:string;

    @ApiProperty({
        type:String,
        description:"Enter your password",
        required:true,
    })
    @IsString()
    @MinLength(6)
    @MaxLength(10)
    @NotContains('email', { message: 'Password cannot contain your email address' })
    @Matches(/^(?=.*[A-Z])(?=.*\d).{6,10}$/, {
        message: 'Password must contain at least one uppercase letter and one digit',
      })
    password:string;
}