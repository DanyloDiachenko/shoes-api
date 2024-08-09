import { ApiProperty } from "@nestjs/swagger";
import { CategoryDto } from "src/categories/dto/category.dto";
import { ProducerDto } from "src/producers/dto/producer.dto";

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
    price: string;

    @ApiProperty({
        description: "Main image URL of the product",
    })
    mainImage: string;

    @ApiProperty({
        description: "Additional image URLs of the product",
        type: [String],
    })
    images: string[];

    @ApiProperty({ description: "Size of the product" })
    size: number;

    @ApiProperty({ description: "Color of the product" })
    color: string;

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
        description: "Producer of the product",
        type: () => ProducerDto,
    })
    producer: ProducerDto;
}
