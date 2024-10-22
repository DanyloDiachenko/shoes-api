import { IsOptional, IsString, IsInt } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateAddressDto {
    @ApiPropertyOptional({ description: "Street of the address" })
    @IsString()
    @IsOptional()
    street?: string;

    @ApiPropertyOptional({ description: "Country of the address" })
    @IsString()
    @IsOptional()
    country?: string;

    @ApiPropertyOptional({ description: "City of the address" })
    @IsString()
    @IsOptional()
    city?: string;

    @ApiPropertyOptional({ description: "Home number of the address" })
    @IsString()
    @IsOptional()
    homeNumber?: string;

    @ApiPropertyOptional({ description: "Postal index of the address" })
    @IsString()
    @IsOptional()
    postIndex?: string;
}
