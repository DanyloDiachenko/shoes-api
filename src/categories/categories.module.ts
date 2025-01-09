import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { ProductEntity } from "src/products/entities/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity, ProductEntity])],
    controllers: [CategoriesController],
    providers: [CategoriesService],
})
export class CategoriesModule {}
