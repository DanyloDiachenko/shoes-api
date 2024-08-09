import { ApiProperty } from "@nestjs/swagger";

export class ProducerDto {
    @ApiProperty({
        description: "ID of the producer",
    })
    id: string;

    @ApiProperty({ description: "Title of the producer" })
    title: string;

    @ApiProperty({ description: "Slug of the producer" })
    slug: string;
}
