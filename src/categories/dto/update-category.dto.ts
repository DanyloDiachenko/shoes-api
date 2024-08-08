import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateCategoryDto {
    @ApiPropertyOptional({ description: "Title of the category" })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ description: "Slug of the category" })
    @IsOptional()
    @IsString()
    slug?: string;
}
