import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductEntity } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { BrandEntity } from "src/brands/entities/brand.entity";
import { ReviewEntity } from "src/reviews/entity/review.entity";
import { ColorEntity } from "src/colors/entity/color.entity";
import { ProductWithRatingDto } from "./dto/productWithRaiting.dto";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productsRepository: Repository<ProductEntity>,
        @InjectRepository(CategoryEntity)
        private readonly categoriesRepository: Repository<CategoryEntity>,
        @InjectRepository(BrandEntity)
        private readonly brandsRepository: Repository<BrandEntity>,
        @InjectRepository(ReviewEntity)
        private readonly reviewsRepository: Repository<ReviewEntity>,
        @InjectRepository(ColorEntity)
        private readonly colorsRepository: Repository<ColorEntity>,
    ) {}

    async create(createProductDto: CreateProductDto) {
        const { categoryId, brandId, colorId, ...productData } =
            createProductDto;

        const category = await this.categoriesRepository.findOne({
            where: { id: categoryId },
        });
        if (!category) {
            throw new NotFoundException(
                `Category with ID ${categoryId} not found`,
            );
        }

        const brand = await this.brandsRepository.findOne({
            where: { id: brandId },
        });
        if (!brand) {
            throw new NotFoundException(`Brand with ID ${brandId} not found`);
        }

        const color = await this.colorsRepository.findOne({
            where: {
                id: colorId,
            },
        });
        if (!color) {
            throw new NotFoundException(`Color with ID ${colorId} not found`);
        }

        const product = this.productsRepository.create({
            ...productData,
            category,
            brand,
            color,
        });

        await this.productsRepository.save(product);

        return { ...product, rating: 0 };
    }

    async delete(id: string) {
        const productToDelete = await this.productsRepository.findOne({
            where: { id },
        });

        if (!productToDelete) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        await this.productsRepository.remove(productToDelete);

        return { success: true };
    }

    async findOne(id: string) {
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: ["category", "brand", "reviews", "reviews.user"],
        });

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        const allMarks = product.reviews.reduce(
            (acc, review) => acc + review.rating,
            0,
        );
        const rating = Math.round(allMarks / product.reviews.length);

        return { ...product, rating };
    }

    async findAll(
        category?: string,
        brand?: string,
        page: number = 1,
        limit: number = 5,
    ) {
        const whereConditions = [];

        if (category) {
            whereConditions.push({ category: { slug: category } });
        }

        if (brand) {
            whereConditions.push({ brand: { slug: brand } });
        }

        const [result, total] = await this.productsRepository.findAndCount({
            where: whereConditions.length > 0 ? whereConditions : {},
            relations: ["category", "brand", "reviews", "color"],
            skip: (page - 1) * limit,
            take: limit,
        });

        const resultWithRating = result.map((product) => {
            const allMarks = product.reviews.reduce(
                (acc, review) => acc + review.rating,
                0,
            );
            const rating = Math.round(allMarks / product.reviews.length);

            return { ...product, rating };
        });

        const totalPages = Math.ceil(total / limit);
        const activeCount = result.length;
        const remainingPages = totalPages - page;

        return {
            data: resultWithRating,
            activeCount: activeCount,
            remainingPages: remainingPages,
        };
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const productToUpdate = await this.productsRepository.findOne({
            where: { id },
            relations: ["category", "reviews", "color", "brand"],
        });

        if (!productToUpdate) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        if (updateProductDto.colorId) {
            const color = await this.colorsRepository.findOne({
                where: { id: updateProductDto.colorId },
            });

            if (!color) {
                throw new NotFoundException(
                    `Color with ID ${updateProductDto.colorId} not found`,
                );
            }

            productToUpdate.color = color;
        }

        if (updateProductDto.categoryId) {
            const category = await this.categoriesRepository.findOne({
                where: { id: updateProductDto.categoryId },
            });

            if (!category) {
                throw new NotFoundException(
                    `Category with ID ${updateProductDto.categoryId} not found`,
                );
            }

            productToUpdate.category = category;
        }

        if (updateProductDto.reviewIds) {
            const reviews = [];

            for (const reviewId of updateProductDto.reviewIds) {
                const review = await this.reviewsRepository.findOne({
                    where: { id: reviewId },
                });

                if (!review) {
                    throw new NotFoundException(
                        `Review with ID ${reviewId} not found`,
                    );
                }
                reviews.push(review);
            }

            productToUpdate.reviews = reviews;
        }

        const updatedProduct = this.productsRepository.merge(
            productToUpdate,
            updateProductDto,
        );

        await this.productsRepository.save(updatedProduct);

        const allMarks = updatedProduct.reviews.reduce(
            (acc, review) => acc + review.rating,
            0,
        );
        const rating = Math.round(allMarks / updatedProduct.reviews.length);

        return { ...updatedProduct, rating: rating };
    }
}
