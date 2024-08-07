import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoriesRepository: Repository<CategoryEntity>,
    ) {}

    async create(createCategoryDto: CreateCategoryDto) {
        const newCategory =
            await this.categoriesRepository.create(createCategoryDto);

        return this.categoriesRepository.save(newCategory);
    }

    async delete(id: string) {
        const categoryToDelete = await this.categoriesRepository.findOne({
            where: { id },
        });

        if (!categoryToDelete) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        return await this.categoriesRepository.remove(categoryToDelete);
    }

    async findOne(id: string) {
        const findedCategory = await this.categoriesRepository.findOne({
            where: { id },
        });

        if (!findedCategory) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        return findedCategory;
    }

    async findAll() {
        return await this.categoriesRepository.find();
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        const categoryToUpdate = await this.categoriesRepository.findOne({
            where: { id },
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
