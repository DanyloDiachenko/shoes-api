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
import { OrderItem } from "src/orderItems/entites/order-item.entity";

export class CreateOrderDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItem)
    cart: OrderItem[];

    @ValidateNested()
    @Type(() => AddressEntity)
    address: AddressEntity;
}
