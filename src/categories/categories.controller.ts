import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoriesService.create(createCategoryDto);
    }

    @Delete(':id')
    async delete(@Param() id: string) {
        return await this.categoriesService.delete(id);
    }

    @Get(':id')
    async findOne(@Param() id: string) {
        return this.categoriesService.findOne(id);
    }

    @Get()
    async findAll() {
        return this.categoriesService.findAll();
    }

    @Put(':id')
    async update(
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Param() id: string,
    ) {
        await this.categoriesService.update(id, updateCategoryDto);
    }
}
