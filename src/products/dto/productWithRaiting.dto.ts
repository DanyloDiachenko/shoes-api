import { ApiProperty } from "@nestjs/swagger";
import { ProductDto } from "./product.dto";

export class ProductWithRatingDto extends ProductDto {
    @ApiProperty({ description: "Rating of the product" })
    rating: number;
}
