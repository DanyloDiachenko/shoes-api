import { Body, Controller, Delete, Post, UseGuards } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { FindOneParamsDto } from "helpers/find-one-params.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("favorites")
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createByProductId(@Body() body: FindOneParamsDto) {
        const productId = body.id;

        return await this.favoritesService.createByProductId(productId);
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    async delete(@Body() body: FindOneParamsDto) {
        const favoriteId = body.id;

        return await this.favoritesService.createByProductId(favoriteId);
    }
}
