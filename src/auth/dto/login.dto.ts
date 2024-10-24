import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({ description: "Email of the user" })
    @IsEmail()
    email: string;

    @ApiProperty({ description: "Password of the user" })
    @IsString()
    password: string;

    @ApiProperty({ description: "Is remember me checked" })
    @IsBoolean()
    @IsOptional()
    rememberMe?: boolean;
}
