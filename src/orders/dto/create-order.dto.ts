import { IsArray, IsUUID } from "class-validator";

export class CreateOrderDto {
    @IsArray()
    cart: { productId: string; quantity: number }[];

    @IsUUID()
    deliveryAddressId: string;
}
