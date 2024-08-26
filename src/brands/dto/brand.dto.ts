import { ApiProperty } from "@nestjs/swagger";

export class BrandDto {
    @ApiProperty({
        description: "ID of the brand",
    })
    id: string;

    @ApiProperty({ description: "Title of the brand" })
    title: string;

    @ApiProperty({ description: "Slug of the brand" })
    slug: string;
}
