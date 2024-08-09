import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiPropertyOptional({ description: "User's email address" })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ description: "User's password", minLength: 6 })
    @IsString()
    @IsOptional()
    @MinLength(6, { message: "Password must be more than 6 symbols" })
    password?: string;
}
