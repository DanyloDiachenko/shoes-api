import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSizeDto {
    @ApiProperty({ description: "Title of the size" })
    @IsString()
    title: string;

    @ApiProperty({ description: "Slug of the size" })
    @IsString()
    slug: string;
}
