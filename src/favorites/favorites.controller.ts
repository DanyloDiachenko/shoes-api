import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { FindOneParamsDto } from "helpers/find-one-params.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";

@Controller("favorites")
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createByProductId(
        @Body() createFavoriteDto: CreateFavoriteDto,
        @Req() req: any,
    ) {
        const userId = req.user.id;

        return await this.favoritesService.createByProductId(
            createFavoriteDto.productId,
            userId,
        );
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    async delete(@Param() params: FindOneParamsDto) {
        const favoriteId = params.id;

        return await this.favoritesService.delete(favoriteId);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUsersFavorites(@Req() req: any) {
        const userId = req.user.id;

        return await this.favoritesService.getUsersFavorites(userId);
    }
}
