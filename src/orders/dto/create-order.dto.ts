import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    amount: number;

    @IsString()
    @IsOptional()
    orderNotes?: string;

    @IsArray()
    @IsNotEmpty()
    cart: { productId: string; quantity: number; size: number }[];

    @IsString()
    shippingType: string;
}
