import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrderEntity } from "./entities/order.entity";
import { AddressEntity } from "../addresses/entities/address.entity";
import { UserEntity } from "src/users/entites/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrderEntity,
            UserEntity,
            AddressEntity
        ]),
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
