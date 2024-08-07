import { Module } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { FavoritesController } from "./favorites.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavoriteEntity } from "./entities/favorite.entity";
import { UserEntity } from "src/users/entites/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([FavoriteEntity, UserEntity])],
    controllers: [FavoritesController],
    providers: [FavoritesService],
})
export class FavoritesModule {}
