import {
    IsString,
    IsInt,
    IsArray,
    IsOptional,
    IsUUID,
    IsNumber,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateProductDto {
    @ApiPropertyOptional({ description: "Title of the product" })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ description: "Description of the product" })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        description: "Available quantity in stock of the product",
    })
    @IsOptional()
    @IsInt()
    quantityInStock?: number;

    @ApiPropertyOptional({ description: "Price of the product in USD" })
    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false }, { each: false })
    priceUsd?: number;

    @ApiPropertyOptional({ description: "Price of the product in EUR" })
    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false }, { each: false })
    priceEur?: number;

    @ApiPropertyOptional({ description: "Main image URL of the product" })
    @IsOptional()
    @IsString()
    mainImage?: string;

    @ApiPropertyOptional({
        description: "Additional image URLs of the product",
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[];

    @ApiPropertyOptional({ description: "Size of the product" })
    @IsOptional()
    @IsInt()
    size?: number;

    @ApiPropertyOptional({ description: "Color ID of the product" })
    @IsOptional()
    @IsUUID()
    colorId: string;

    @ApiPropertyOptional({
        description: "Discount percentage for the product, if any",
        nullable: true,
    })
    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false }, { each: false })
    discountPercentage?: number;

    @ApiPropertyOptional({ description: "Product information of the product" })
    @IsOptional()
    @IsString()
    productInformtion?: string;

    @ApiPropertyOptional({
        description: "Additional information of the product",
    })
    @IsOptional()
    @IsString()
    additionalInformation?: string;

    @ApiPropertyOptional({ description: "Number of product was purchased" })
    @IsOptional()
    @IsNumber()
    purchasedNumber?: number;

    @ApiPropertyOptional({
        description: "ID of the main category to which the product belongs",
    })
    @IsOptional()
    @IsUUID()
    mainCategoryId?: string;

    @ApiPropertyOptional({
        description: "Category IDs of the product",
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @IsUUID("4", { each: true })
    categoryIds?: string[];

    @ApiPropertyOptional({ description: "ID of the brand of the product" })
    @IsOptional()
    @IsUUID()
    brandId?: string;

    @ApiPropertyOptional({
        description: "Reviews of the product",
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @IsUUID("4", { each: true })
    reviewIds?: string[];

    @ApiPropertyOptional({
        description: "Size IDS of the product",
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @IsUUID("4", { each: true })
    sizeIds?: string[];
}
