import {
    IsString,
    IsInt,
    IsArray,
    IsOptional,
    IsUUID,
    IsNumber,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CategoryEntity } from "src/categories/entities/category.entity";

export class CreateProductDto {
    @ApiProperty({ description: "Title of the product" })
    @IsString()
    title: string;

    @ApiProperty({ description: "Description of the product" })
    @IsString()
    description: string;

    @ApiProperty({ description: "Available quantity in stock of the product" })
    @IsInt()
    quantityInStock: number;

    @ApiProperty({ description: "Price of the product" })
    @IsNumber({ allowInfinity: false, allowNaN: false }, { each: false })
    price: number;

    @ApiProperty({ description: "Main image URL of the product" })
    @IsString()
    mainImage: string;

    @ApiProperty({
        description: "Additional image URLs of the product",
        type: [String],
    })
    @IsArray()
    @IsString({ each: true })
    images: string[];

    @ApiProperty({ description: "Size of the product" })
    @IsInt()
    size: number;

    @ApiProperty({ description: "Color ID of the product" })
    @IsUUID()
    colorId: string;

    @ApiProperty({
        description: "Discount percentage for the product, if any",
        nullable: true,
    })
    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false }, { each: false })
    discountPercentage?: number;

    @ApiProperty({
        description: "ID of the main category to which the product belongs",
    })
    @IsUUID()
    mainCategoryId: string;

    @ApiProperty({ description: "Category IDs of the product" })
    @IsArray()
    @IsUUID("4", { each: true })
    categoryIds: string[];

    @ApiProperty({ description: "ID of the brand of the product" })
    @IsUUID()
    brandId: string;

    @ApiProperty({
        description: "Size IDS of the product",
        type: [String],
    })
    @IsArray()
    @IsUUID("4", { each: true })
    sizeIds: string[];
}
