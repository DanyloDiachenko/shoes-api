import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { OrderEntity } from "./entities/order.entity";
import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entites/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderEntity, ProductEntity, UserEntity]),
    ],
    providers: [OrdersService],
    controllers: [OrdersController],
})
export class OrdersModule {}
