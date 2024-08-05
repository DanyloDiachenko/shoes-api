import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6, { message: "Password must be more than 6 symbols" })
    password: string;
}
