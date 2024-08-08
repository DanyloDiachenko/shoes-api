import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({ description: "Email of the user" })
    email: string;

    @ApiProperty({ description: "Password of the user" })
    password: string;
}
