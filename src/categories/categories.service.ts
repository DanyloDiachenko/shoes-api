import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { ProductEntity } from "src/products/entities/product.entity";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoriesRepository: Repository<CategoryEntity>,
        @InjectRepository(ProductEntity)
        private readonly productsRepository: Repository<ProductEntity>
    ) {}

    async create(createCategoryDto: CreateCategoryDto) {
        const isExistingCategory = await this.categoriesRepository.findOne({
            where: { slug: createCategoryDto.slug },
        });

        if (!isExistingCategory) {
            const newCategory =
                await this.categoriesRepository.create(createCategoryDto);

            return this.categoriesRepository.save(newCategory);
        }

        throw new BadRequestException(
            `Category with Slug ${createCategoryDto.slug} already exists`,
        );
    }

    async delete(id: string) {
        const categoryToDelete = await this.categoriesRepository.findOne({
            where: { id },
        });

        if (!categoryToDelete) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        await this.categoriesRepository.remove(categoryToDelete);

        return { success: true };
    }

    async findOne(id: string) {
        const findedCategory = await this.categoriesRepository.findOne({
            where: { id },
            relations: ["products"],
        });

        if (!findedCategory) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        return {
            ...findedCategory,
            products: undefined,
            productsQuantity: findedCategory.products.length,
        };
    }

    async findAll() {
        const categories = await this.categoriesRepository.find({
            relations: ["products"],
        });

        const products = await this.productsRepository.find({
            relations: ["categories"],
        });

        return categories.map((category) => {
            const productsQuantity = products.filter((product) =>
                product.categories.some((cat) => cat.id === category.id),
            ).length;

            return {
                ...category,
                products: undefined,
                productsQuantity,
            };
        });
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        const categoryToUpdate = await this.categoriesRepository.findOne({
            where: { id },
            relations: ["products"],
        });

        if (!categoryToUpdate) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        const updatedCategory = this.categoriesRepository.merge(
            categoryToUpdate,
            updateCategoryDto,
        );

        return await this.categoriesRepository.save(updatedCategory);
    }
}
