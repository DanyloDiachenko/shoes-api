import { ApiProperty } from "@nestjs/swagger";

export class AddressDto {
    @ApiProperty({ description: "ID of the address" })
    id: string;

    @ApiProperty({ description: "Street of the address" })
    street: string;

    @ApiProperty({ description: "Country of the address" })
    country: string;

    @ApiProperty({ description: "City of the address" })
    city: string;

    @ApiProperty({ description: "Home number of the address" })
    homeNumber: string;

    @ApiProperty({ description: "Postal index of the address" })
    postIndex: number;
}
