import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

export class CategoriesService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ) {}

    async create(createCategoryDto: CreateCategoryDto) {
        const newCategory =
            await this.categoryRepository.create(createCategoryDto);

        return this.categoryRepository.save(newCategory);
    }

    async delete(id: string) {
        const categoryToDelete = await this.categoryRepository.findOne({
            where: { id },
        });

        return await this.categoryRepository.remove(categoryToDelete);
    }

    async findOne(id: string) {
        const findedCategory = await this.categoryRepository.findOne({
            where: { id },
        });

        if (!findedCategory) {
            throw new Error(`Category with ID ${id} not found`);
        }

        return findedCategory;
    }

    async findAll() {
        return await this.categoryRepository.find();
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        const categoryToUpdate = await this.categoryRepository.findOne({
            where: { id },
        });

        if (!categoryToUpdate) {
            throw new Error(`Category with ID ${id} not found`);
        }

        categoryToUpdate.title = updateCategoryDto.title;
        return this.categoryRepository.save(categoryToUpdate);
    }
}
