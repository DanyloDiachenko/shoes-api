import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrderEntity } from "./entities/order.entity";
import { OrderCartItemEntity } from "src/orderCartItems/entites/order-cart-item.entity";
import { AddressEntity } from "../addresses/entities/address.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrderEntity,
            OrderCartItemEntity,
            AddressEntity,
        ]),
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
