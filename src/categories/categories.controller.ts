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
import { FindOneParamsDto } from '../helpers/find-one-params.dto';

@Controller('/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoriesService.create(createCategoryDto);
    }

    @Delete(':id')
    async delete(@Param() params: FindOneParamsDto) {
        return await this.categoriesService.delete(params.id);
    }

    @Get(':id')
    async getOne(@Param() params: FindOneParamsDto) {
        return this.categoriesService.findOne(params.id);
    }

    @Get()
    async getAll() {
        return this.categoriesService.findAll();
    }

    @Put(':id')
    async update(
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Param() params: FindOneParamsDto,
    ) {
        return await this.categoriesService.update(params.id, updateCategoryDto);
    }
}
