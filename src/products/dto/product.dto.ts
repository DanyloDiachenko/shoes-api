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

    @ApiProperty({ description: "Timestamp when the order was created" })
    createdAt: Date;

    @ApiProperty({
        description: "Title of the product",
    })
    title: string;

    @ApiProperty({
        description: "Description of the product",
    })
    description: string;

    @ApiProperty({
        description: "Available quantity in stock of the product",
    })
    quantityInStock: number;

    @ApiProperty({ description: "Product information of the product" })
    productInformation: string;

    @ApiProperty({ description: "Additional information of the product" })
    additionalInformation: string;

    @ApiProperty({ description: "Number of product was purchased" })
    purchasedNumber: number;

    @ApiProperty({ description: "Price of the product in UAH" })
    priceUah: number;

    @ApiProperty({ description: "Price of the product in EUR" })
    priceEur: number;

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
        description: "Price of the product with discount in UAH, if any",
        nullable: true,
    })
    priceWithDiscountUah: number | null;

    @ApiProperty({
        description: "Price of the product with discount in EUR, if any",
        nullable: true,
    })
    priceWithDiscountEur: number | null;

    @ApiProperty({
        description: "Category of the product",
        type: () => CategoryDto,
    })
    mainCategory: CategoryDto;

    @ApiProperty({ description: "Categories of the product" })
    categories: CategoryDto[];

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
