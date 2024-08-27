import { ApiProperty } from "@nestjs/swagger";

export class ColorDto {
    @ApiProperty({ description: "ID of the color" })
    id: string;

    @ApiProperty({ description: "Title of the color" })
    title: string;

    @ApiProperty({ description: "Slug of the color" })
    slug: string;

    @ApiProperty({ description: "Hex code of the color" })
    hexCode: string;
}
