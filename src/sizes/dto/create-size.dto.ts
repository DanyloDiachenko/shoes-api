import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateSizeDto {
    @ApiProperty({ description: "Title of the size" })
    @IsNumber()
    title: number;

    @ApiProperty({ description: "Slug of the size" })
    @IsNumber()
    slug: number;
}
