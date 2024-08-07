import { Type } from "class-transformer";
import {
    IsString,
    IsNumber,
    Min,
    Max,
    IsOptional,
    ValidateNested,
    IsInt,
    IsArray,
} from "class-validator";
import { AddressEntity } from "src/addresses/entities/address.entity";
import { OrderCartItemEntity } from "src/orderCartItems/entites/order-cart-item.entity";

export class CreateOrderDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderCartItemEntity)
    cart: OrderCartItemEntity[];

    @ValidateNested()
    @Type(() => AddressEntity)
    address: AddressEntity;
}
