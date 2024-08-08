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
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBearerAuth,
    ApiBody,
} from "@nestjs/swagger";
import { FavoriteDto } from "./dto/favorite.dto";

@ApiTags("favorites")
@Controller("favorites")
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Add a product to favorites" })
    @ApiBody({ type: CreateFavoriteDto })
    @ApiResponse({
        status: 201,
        description: "The product has been added to favorites.",
        type: FavoriteDto,
    })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 404, description: "Product with ID not found" })
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
    @ApiBearerAuth()
    @ApiOperation({ summary: "Remove a product from favorites" })
    @ApiParam({ name: "id", description: "ID of the favorite to remove" })
    @ApiResponse({
        status: 200,
        description: "The product has been removed from favorites.",
        example: { success: true }
    })
    @ApiResponse({ status: 404, description: "Favorite not found." })
    async delete(@Param() params: FindOneParamsDto) {
        const favoriteId = params.id;

        return await this.favoritesService.delete(favoriteId);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get all favorites of the user" })
    @ApiResponse({
        status: 200,
        description: "Return all favorites of the user.",
        type: [FavoriteDto],
    })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    async getUsersFavorites(@Req() req: any) {
        const userId = req.user.id;

        return await this.favoritesService.getUsersFavorites(userId);
    }
}
