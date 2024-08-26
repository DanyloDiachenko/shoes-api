import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBrandDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "Title of the brand" })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "Slug of the brand" })
    slug: string;
}
