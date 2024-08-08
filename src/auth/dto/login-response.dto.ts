import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
    @ApiProperty({ description: "ID of the user" })
    id: string;

    @ApiProperty({ description: "Email of the user" })
    email: string;

    @ApiProperty({ description: "JWT token" })
    token: string;
}
