import {
    IsString,
    IsInt,
    IsDecimal,
    IsArray,
    IsOptional,
    IsUUID,
    IsNumber,
} from "class-validator";

export class CreateProductDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsInt()
    quantity: number;

    @IsNumber({ allowInfinity: false, allowNaN: false }, { each: false })
    price: number;

    @IsString()
    mainImage: string;

    @IsArray()
    @IsString({ each: true })
    images: string[];

    @IsInt()
    size: number;

    @IsString()
    color: string;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false }, { each: false })
    discountPercentage?: number;

    @IsUUID()
    categoryId: string;

    @IsUUID()
    producerId: string;
}
