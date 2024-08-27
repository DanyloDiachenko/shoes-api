import { Module } from "@nestjs/common";
import { ColorsController } from "./colors.controller";
import { ColorsService } from "./colors.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColorEntity } from "./entity/color.entity";
import { ProductEntity } from "src/products/entities/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ColorEntity, ProductEntity])],
    controllers: [ColorsController],
    providers: [ColorsService],
})
export class ColorsModule {}
