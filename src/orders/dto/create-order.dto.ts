import { Type } from "class-transformer";
import {
    IsString,
    IsUUID,
    IsInt,
    IsArray,
    ValidateNested,
} from "class-validator";

class ProductOrderDto {
    @IsUUID()
    productId: string;

    @IsInt()
    quantity: number;
}

export class CreateOrderDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductOrderDto)
    cart: ProductOrderDto[];

    @IsUUID()
    deliveryAddressId: string;
}
