import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { ProducerEntity } from "src/producers/entities/producer.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity, CategoryEntity, ProducerEntity])],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
