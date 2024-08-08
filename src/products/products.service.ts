import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductEntity } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { ProducerEntity } from "src/producers/entities/producer.entity";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productsRepository: Repository<ProductEntity>,
        @InjectRepository(CategoryEntity)
        private categoriesRepository: Repository<CategoryEntity>,
        @InjectRepository(ProducerEntity)
        private readonly producersRepository: Repository<ProductEntity>,
    ) {}

    async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
        const { categoryId, producerId, ...productData } = createProductDto;

        const category = await this.categoriesRepository.findOne({
            where: { id: categoryId },
        });
        if (!category) {
            throw new NotFoundException(
                `Category with ID ${categoryId} not found`,
            );
        }

        const producer = await this.producersRepository.findOne({
            where: { id: producerId },
        });
        if (!producer) {
            throw new NotFoundException(
                `Producer with ID ${categoryId} not found`,
            );
        }

        const product = this.productsRepository.create({
            ...productData,
            category,
            producer,
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

        return await this.productsRepository.remove(productToDelete);
    }

    async findOne(id: string): Promise<ProductEntity> {
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: ["category", "producer"],
        });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async findAll(category?: string, producer?: string) {
        const whereConditions = [];

        if (category) {
            whereConditions.push({ category: { slug: category } });
        }

        if (producer) {
            whereConditions.push({ producer: { slug: producer } });
        }

        return this.productsRepository.find({
            where: whereConditions.length > 0 ? whereConditions : {},
            relations: ["category", "producer"],
        });
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
