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

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoriesRepository: Repository<CategoryEntity>,
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
        const categories = await this.categoriesRepository
            .createQueryBuilder("category")
            .leftJoin("category.products", "product")
            .select([
                "category.id",
                "category.slug",
                "category.title",
                "COUNT(product.id) AS productsQuantity",
            ])
            .groupBy("category.id")
            .getRawMany();

        return categories.map((category) => ({
            id: category.category_id,
            slug: category.category_slug,
            title: category.category_title,
            productsQuantity: Number(category.productsquantity),
        }));
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
