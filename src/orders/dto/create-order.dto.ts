import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateOrderDto {
    @IsArray()
    cart: { productId: string; quantity: number }[];

    @IsUUID()
    deliveryAddressId: string;

    @IsString()
    @IsOptional()
    orderNotes?: string;
}
