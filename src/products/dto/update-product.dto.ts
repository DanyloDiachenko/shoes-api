import {
    IsString,
    IsInt,
    IsDecimal,
    IsArray,
    IsOptional,
    IsUUID,
    IsNumber,
} from "class-validator";

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsInt()
    quantity?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false }, { each: false })
    price?: number;

    @IsOptional()
    @IsString()
    mainImage?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[];

    @IsOptional()
    @IsInt()
    size?: number;

    @IsOptional()
    @IsString()
    color?: string;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false }, { each: false })
    discountPercentage?: number;

    @IsOptional()
    @IsUUID()
    categoryId?: string;

    @IsOptional()
    @IsUUID()
    producerId?: string;
}
