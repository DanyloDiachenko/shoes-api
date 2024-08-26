import { ApiProperty } from "@nestjs/swagger";

export class ReviewDto {
    @ApiProperty({
        description: "ID of the review",
    })
    id: string;

    @ApiProperty({
        description: "Rating of the review (0-5)",
    })
    rating: number;

    @ApiProperty({ description: "Timestamp when the order was created" })
    createdAt: Date;

    @ApiProperty({
        description: "Title of the review",
    })
    title: string;

    @ApiProperty({
        description: "Description of the review",
    })
    description: string;

    @ApiProperty({
        description: "Helpful number of the review",
    })
    helpfulNumber: number;

    @ApiProperty({
        description: "Unhelpful number of the review",
    })
    unhelpfulNumber: number;
}
