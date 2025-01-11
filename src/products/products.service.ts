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
import { SizeEntity } from "src/sizes/entity/size.entity";
import { In } from "typeorm";

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
        @InjectRepository(SizeEntity)
        private readonly sizesRepository: Repository<SizeEntity>,
    ) {}

    async create(createProductDto: CreateProductDto) {
        const {
            mainCategoryId,
            brandId,
            colorId,
            sizeIds,
            categoryIds,
            ...productData
        } = createProductDto;

        const mainCategory = await this.categoriesRepository.findOne({
            where: { id: mainCategoryId },
        });
        if (!mainCategory) {
            throw new NotFoundException(
                `Category with ID ${mainCategoryId} not found`,
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

        let sizes: SizeEntity[] = [];
        for (const sizeId of sizeIds) {
            const size = await this.sizesRepository.findOne({
                where: { id: sizeId },
            });

            if (!size) {
                throw new NotFoundException(`Size with ID ${sizeId} not found`);
            }

            sizes.push(size);
        }

        let categories: CategoryEntity[] = [];
        for (const categoryId of categoryIds) {
            const category = await this.categoriesRepository.findOne({
                where: { id: categoryId },
            });

            if (!category) {
                throw new NotFoundException(
                    `Size with ID ${categoryId} not found`,
                );
            }

            categories.push(category);
        }

        const product = this.productsRepository.create({
            ...productData,
            categories,
            sizes,
            mainCategory,
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
            relations: [
                "mainCategory",
                "brand",
                "reviews",
                "reviews.user",
                "sizes",
                "color",
                "categories",
            ],
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
        page: number = 1,
        limit: number = 6,
        sortBy: "mostPopular" | "mostRated" | "date" = "mostPopular",
        categories: string[] = [],
        sizes: string[] = [],
        color: string = "",
        brands: string[] = [],
        currency: "uah" | "eur",
        priceFrom: number = 0,
        priceTo: number = 100000,
    ) {
        const query = this.productsRepository.createQueryBuilder("product");

        query
            .leftJoinAndSelect("product.mainCategory", "mainCategory")
            .leftJoinAndSelect("product.categories", "categories")
            .leftJoinAndSelect("product.color", "color")
            .leftJoinAndSelect("product.brand", "brand")
            .leftJoinAndSelect("product.sizes", "sizes")
            .leftJoinAndSelect("product.reviews", "reviews");

        if (categories.length > 0) {
            query.andWhere(
                (qb) =>
                    "product.id IN " +
                    qb
                        .subQuery()
                        .select("productSub.id")
                        .from(ProductEntity, "productSub")
                        .leftJoin("productSub.categories", "category")
                        .where("category.slug IN (:...categories)", {
                            categories,
                        })
                        .getQuery(),
            );
        }

        if (sizes.length > 0) {
            query.andWhere("sizes.slug IN (:...sizes)", { sizes });
        }

        if (color) {
            query.andWhere("color.slug = :color", { color });
        }

        if (brands.length > 0) {
            query.andWhere("brand.slug IN (:...brands)", { brands });
        }

        if (currency === "uah") {
            query.andWhere(
                `(COALESCE(product.priceWithDiscountUah, product.priceUah) BETWEEN :priceFrom AND :priceTo)`,
                {
                    priceFrom: priceFrom,
                    priceTo: priceTo,
                },
            );
        } else if (currency === "eur") {
            query.andWhere(
                `(COALESCE(product.priceWithDiscountEur, product.priceEur) BETWEEN :priceFrom AND :priceTo)`,
                {
                    priceFrom: priceFrom,
                    priceTo: priceTo,
                },
            );
        }

        switch (sortBy) {
            case "mostPopular":
                query.orderBy("product.purchasedNumber", "DESC");
                break;
            case "date":
                query.orderBy("product.createdAt", "DESC");
                break;
        }

        query.skip((page - 1) * limit).take(limit);

        const [products, total] = await query.getManyAndCount();

        const productsWithRating = products.map((product) => {
            const totalReviews = product.reviews.length;
            const rating =
                totalReviews > 0
                    ? product.reviews.reduce(
                          (acc, review) => acc + review.rating,
                          0,
                      ) / totalReviews
                    : null;
            return {
                ...product,
                rating,
            };
        });

        const response = {
            data: productsWithRating,
            total,
            totalPages: Math.ceil(total / limit),
            count: productsWithRating.length,
            page,
            limit,
        };

        return response;
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const productToUpdate = await this.productsRepository.findOne({
            where: { id },
            relations: [
                "mainCategory",
                "reviews",
                "color",
                "brand",
                "sizes",
                "categories",
            ],
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

        if (updateProductDto.mainCategoryId) {
            const category = await this.categoriesRepository.findOne({
                where: { id: updateProductDto.mainCategoryId },
            });

            if (!category) {
                throw new NotFoundException(
                    `Category with ID ${updateProductDto.mainCategoryId} not found`,
                );
            }

            productToUpdate.mainCategory = category;
        }

        if (updateProductDto.categoryIds) {
            let categories: CategoryEntity[] = [];

            for (const categoryId of updateProductDto.categoryIds) {
                const category = await this.categoriesRepository.findOne({
                    where: {
                        id: categoryId,
                    },
                });

                if (!category) {
                    throw new NotFoundException(
                        `Category with ID ${categoryId} not found`,
                    );
                }

                categories.push(category);
            }

            productToUpdate.categories = categories;
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

        if (updateProductDto.sizeIds) {
            let sizes: SizeEntity[] = [];

            for (const sizeId of updateProductDto.sizeIds) {
                const size = await this.sizesRepository.findOne({
                    where: {
                        id: sizeId,
                    },
                });

                if (!size) {
                    throw new NotFoundException(
                        `Size with ID ${sizeId} not found`,
                    );
                }

                sizes.push(size);
            }

            productToUpdate.sizes = sizes;
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
