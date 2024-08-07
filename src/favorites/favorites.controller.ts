import { Body, Controller, Delete, Post } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { FindOneParamsDto } from "helpers/find-one-params.dto";

@Controller("favorites")
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Post()
    async createByProductId(@Body() body: FindOneParamsDto) {
        const productId = body.id;

        return await this.favoritesService.createByProductId(productId);
    }

    @Delete()
    async delete(@Body() body: FindOneParamsDto) {
        const favoriteId = body.id;

        return await this.favoritesService.createByProductId(favoriteId);
    }
}
