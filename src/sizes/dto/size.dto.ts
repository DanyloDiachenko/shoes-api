import { ApiProperty } from "@nestjs/swagger";

export class SizeDto {
    @ApiProperty({
        description: "ID of the size",
    })
    id: string;

    @ApiProperty({
        description: "Title of the size",
    })
    title: number;

    @ApiProperty({
        description: "Slug of the size",
    })
    slug: number;
}
