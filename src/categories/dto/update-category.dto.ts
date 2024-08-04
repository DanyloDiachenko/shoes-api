import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    slug?: string;
}
