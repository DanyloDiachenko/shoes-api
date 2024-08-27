import { ApiProperty } from "@nestjs/swagger";
import { CategoryDto } from "src/categories/dto/category.dto";
import { BrandDto } from "src/brands/dto/brand.dto";
import { ReviewDto } from "src/reviews/dto/review.dto";
import { ColorDto } from "src/colors/dto/color.dto";
import { SizeDto } from "src/sizes/dto/size.dto";

export class ProductDto {
    @ApiProperty({
        description: "ID of the product",
    })
    id: string;

    @ApiProperty({
        description: "Title of the product",
    })
    title: string;

    @ApiProperty({
        description: "Description of the product",
    })
    description: string;

    @ApiProperty({
        description: "Available quantity of the product",
    })
    quantity: number;

    @ApiProperty({ description: "Price of the product" })
    price: number;

    @ApiProperty({
        description: "Main image URL of the product",
    })
    mainImage: string;

    @ApiProperty({
        description: "Additional image URLs of the product",
        type: [String],
    })
    images: string[];

    @ApiProperty({ description: "Color of the product", type: () => ColorDto })
    color: ColorDto;

    @ApiProperty({
        description: "Discount percentage for the product, if any",
        nullable: true,
    })
    discountPercentage: number | null;

    @ApiProperty({
        description: "Category of the product",
        type: () => CategoryDto,
    })
    category: CategoryDto;

    @ApiProperty({
        description: "Brand of the product",
        type: () => BrandDto,
    })
    brand: BrandDto;

    @ApiProperty({
        description: "Reviews of the product",
        type: [ReviewDto],
    })
    reviews: ReviewDto[];

    @ApiProperty({
        description: "Sizes of the product",
        type: [SizeDto],
    })
    sizes: SizeDto[];
}
