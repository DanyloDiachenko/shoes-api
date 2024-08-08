import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Unique } from "typeorm";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    slug: string;
}
