import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({ description: "Title of the category" })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: "Slug of the category" })
    @IsString()
    @IsNotEmpty()
    slug: string;
}
