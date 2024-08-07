import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/products/entities/product.entity";
import { Repository } from "typeorm";
import { FavoriteEntity } from "./entities/favorite.entity";

export class FavoritesService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productsRepository: Repository<ProductEntity>,
        @InjectRepository(FavoriteEntity)
        private readonly favoritesRepository: Repository<FavoriteEntity>,
    ) {}

    async createByProductId(productId: string) {
        const findedProduct = await this.productsRepository.findOne({
            where: { id: productId },
        });

        if (!findedProduct) {
            throw new NotFoundException(
                `Product with ID ${productId} not found`,
            );
        }

        const createdFavorite = await this.favoritesRepository.create({
            title: findedProduct.title,
            mainImage: findedProduct.mainImage,
        });

        return this.favoritesRepository.save(createdFavorite);
    }
}
