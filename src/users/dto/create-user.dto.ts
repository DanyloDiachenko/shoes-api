import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ description: "User's email address" })
    @IsEmail()
    email: string;

    @ApiProperty({ description: "User's password", minLength: 6 })
    @IsString()
    @MinLength(6, { message: "Password must be more than 6 symbols" })
    password: string;

    @ApiProperty({ description: "User`s first name" })
    @IsString()
    @IsOptional()
    firstName?: string;

    @ApiProperty({ description: "User`s last name" })
    @IsString()
    @IsOptional()
    lastName?: string;
}
