import { Module } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { FavoritesController } from "./favorites.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavoriteEntity } from "./entities/favorite.entity";
import { UserEntity } from "src/users/entites/user.entity";
import { ProductEntity } from "src/products/entities/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([FavoriteEntity, UserEntity, ProductEntity])],
    controllers: [FavoritesController],
    providers: [FavoritesService],
})
export class FavoritesModule {}
