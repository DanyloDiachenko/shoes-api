import { ApiProperty } from "@nestjs/swagger";

export class ProducerDto {
    @ApiProperty({
        description: "ID of the producer",
        example: "f97f44b7-7bdb-4639-ab1c-1a2fca0257e9",
    })
    id: string;

    @ApiProperty({ description: "Title of the producer", example: "Nike" })
    title: string;

    @ApiProperty({ description: "Slug of the producer", example: "nike" })
    slug: string;
}
