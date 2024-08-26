import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductEntity } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { BrandEntity } from "src/brands/entities/brand.entity";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productsRepository: Repository<ProductEntity>,
        @InjectRepository(CategoryEntity)
        private categoriesRepository: Repository<CategoryEntity>,
        @InjectRepository(BrandEntity)
        private readonly brandsRepository: Repository<BrandEntity>,
    ) {}

    async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
        const { categoryId, brandId, ...productData } = createProductDto;

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

        const product = this.productsRepository.create({
            ...productData,
            category,
            brand,
        });

        return this.productsRepository.save(product);
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

    async findOne(id: string): Promise<ProductEntity> {
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: ["category", "brand"],
        });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
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
            relations: ["category", "brand"],
            skip: (page - 1) * limit,
            take: limit,
        });

        const totalPages = Math.ceil(total / limit);
        const activeCount = result.length;
        const remainingPages = totalPages - page;

        return {
            data: result,
            activeCount: activeCount,
            remainingPages: remainingPages,
        };
    }

    async update(
        id: string,
        updateProductDto: UpdateProductDto,
    ): Promise<ProductEntity> {
        const productToUpdate = await this.productsRepository.findOne({
            where: { id },
        });
        if (!productToUpdate) {
            throw new NotFoundException(`Product with ID ${id} not found`);
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

        const updatedProduct = this.productsRepository.merge(
            productToUpdate,
            updateProductDto,
        );
        return this.productsRepository.save(updatedProduct);
    }
}
