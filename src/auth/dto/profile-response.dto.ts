import { ApiProperty } from "@nestjs/swagger";

export class ProfileResponseDto {
    @ApiProperty({ description: "ID of the user" })
    id: string;

    @ApiProperty({ description: "Email of the user" })
    email: string;
}
