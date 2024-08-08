import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/products/entities/product.entity";
import { Repository } from "typeorm";
import { FavoriteEntity } from "./entities/favorite.entity";
import { UserEntity } from "src/users/entites/user.entity";

@Injectable()
export class FavoritesService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productsRepository: Repository<ProductEntity>,
        @InjectRepository(FavoriteEntity)
        private readonly favoritesRepository: Repository<FavoriteEntity>,
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) {}

    async createByProductId(productId: string, userId: string) {
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
            user: { id: userId },
        });

        await this.favoritesRepository.save(createdFavorite);

        return {
            ...createdFavorite,
            user: undefined,
        };
    }

    async getUsersFavorites(userId: string) {
        const userExists = await this.usersRepository.findOne({
            where: { id: userId },
        });

        if (!userExists) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        return await this.favoritesRepository.find({
            where: { user: { id: userId } },
        });
    }

    async delete(id: string) {
        const favoriteToDelete = await this.favoritesRepository.find({
            where: { id },
        });

        if (!favoriteToDelete) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        await this.favoritesRepository.delete({ id });

        return {
            success: true,
        };
    }
}
