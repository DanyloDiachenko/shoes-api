import { ApiProperty } from "@nestjs/swagger";

export class CategoryDto {
    @ApiProperty({ description: "ID of the category" })
    id: string;

    @ApiProperty({ description: "Title of the category" })
    title: string;

    @ApiProperty({ description: "Slug of the category" })
    slug: string;
}
