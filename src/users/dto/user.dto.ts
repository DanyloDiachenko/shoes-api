import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({ description: "ID of the user" })
    id: string;

    @ApiProperty({ description: "User`s email" })
    email: string;

    @ApiProperty({ description: "Name of the user", nullable: true })
    firstName?: string;

    @ApiProperty({ description: "Surname of the user", nullable: true })
    lastName?: string;

    @ApiProperty({ description: "Display name of the user", nullable: true })
    displayName?: string;

    @ApiProperty({ description: "Phone number of the user", nullable: true })
    phone?: string;
}
