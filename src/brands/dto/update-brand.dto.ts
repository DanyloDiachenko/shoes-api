import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateBrandDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ description: "Title of the brand" })
    title: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: "Slug of the brand" })
    slug: string;
}
