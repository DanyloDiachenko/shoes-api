import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiPropertyOptional({ description: "User's email address" })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ description: "New user's password", minLength: 6 })
    @IsString()
    @IsOptional()
    @MinLength(6, { message: "New password must be more than 6 symbols" })
    newPassword?: string;

    @ApiPropertyOptional({
        description: "Previous user's password",
        minLength: 6,
    })
    @IsString()
    @IsOptional()
    @MinLength(6, { message: "Previous password must be more than 6 symbols" })
    currentPassword?: string;

    @ApiPropertyOptional({ description: "First name of the user" })
    @IsString()
    @IsOptional()
    firstName?: string;

    @ApiPropertyOptional({ description: "Last name of the user" })
    @IsString()
    @IsOptional()
    lastName?: string;

    @ApiPropertyOptional({ description: "Display name of the user" })
    @IsString()
    @IsOptional()
    displayName?: string;

    @ApiPropertyOptional({ description: "Phone number of the user" })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiPropertyOptional({ description: "Auth provider of the user" })
    @IsString()
    @IsOptional()
    authProvider?: string;
}
