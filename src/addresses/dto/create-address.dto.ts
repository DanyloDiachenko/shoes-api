import { IsString, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAddressDto {
    @ApiProperty({ description: "Street of the address" })
    @IsString()
    street: string;

    @ApiProperty({ description: "Country of the address" })
    @IsString()
    country: string;

    @ApiProperty({ description: "City of the address" })
    @IsString()
    city: string;

    @ApiProperty({ description: "Home number of the address" })
    @IsString()
    homeNumber: string;

    @ApiProperty({ description: "Postal index of the address" })
    @IsString()
    postIndex: string;
}
