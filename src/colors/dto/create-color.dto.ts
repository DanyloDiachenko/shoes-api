import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateColorDto {
    @IsString()
    @ApiProperty({ description: "Title of the color" })
    title: string;

    @IsString()
    @ApiProperty({ description: "Slug of the color" })
    slug: string;

    @IsString()
    @ApiProperty({ description: "Hex code of the color" })
    hexCode: string;
}
