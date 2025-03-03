import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class RegisterDto {
    @ApiProperty({ description: "Email of the user" })
    @IsEmail()
    email: string;

    @ApiProperty({ description: "Password of the user" })
    @IsString()
    password: string;
}
