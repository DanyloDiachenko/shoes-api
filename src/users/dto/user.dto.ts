import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({ description: "ID of the user" })
    id: string;

    @ApiProperty({ description: "User`s email" })
    email: string;
}
