import { IsString, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAddressDto {
    @ApiProperty({ description: "Name of the receiver" })
    @IsString()
    receiver: string;

    @ApiProperty({ description: "Phone number of the receiver" })
    @IsString()
    phone: string;

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
    @IsInt()
    postIndex: number;
}
