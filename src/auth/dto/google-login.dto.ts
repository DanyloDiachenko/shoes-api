import { ApiProperty } from "@nestjs/swagger";

export class GoogleLoginDto {
    @ApiProperty({
        description: "Google OAuth token",
        example: "ya29.a0AfH6SMB...",
    })
    token: string;
}
