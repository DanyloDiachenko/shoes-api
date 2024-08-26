import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BrandEntity } from "./entities/brand.entity";
import { BrandsController } from "./brands.controller";
import { BrandsService } from "./brands.service";

@Module({
    imports: [TypeOrmModule.forFeature([BrandEntity])],
    controllers: [BrandsController],
    providers: [BrandsService],
})
export class BrandsModule {}
