import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID, Max, Min } from "class-validator";

export class CreateReviewDto {
    @IsNumber()
    @Max(5)
    @Min(0)
    @ApiProperty({ description: "Rating of the product (0-5)" })
    rating: number;

    @IsString()
    @ApiProperty({
        description: "Title of the review",
    })
    title: string;

    @IsString()
    @ApiProperty({
        description: "Description of the review",
    })
    description: string;

    @IsUUID()
    @ApiProperty({
        description: "ID of the product",
    })
    productId: string;
}
