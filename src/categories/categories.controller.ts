import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { FindOneParamsDto } from "../../helpers/find-one-params.dto";
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBody,
} from "@nestjs/swagger";
import { CategoryDto } from "./dto/category.dto";

@ApiTags("categories")
@Controller("/categories")
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    @ApiOperation({ summary: "Create a new category" })
    @ApiResponse({
        status: 201,
        description: "The category has been successfully created.",
        type: CategoryDto,
    })
    @ApiResponse({
        status: 400,
        description: "Category with this slug already exists",
    })
    @ApiBody({ type: CreateCategoryDto })
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoriesService.create(createCategoryDto);
    }

    @Delete(":id")
    @ApiOperation({ summary: "Delete a category by ID" })
    @ApiParam({ name: "id", description: "ID of the category to delete" })
    @ApiResponse({
        status: 200,
        description: "The category has been successfully deleted.",
        example: { success: true },
    })
    @ApiResponse({ status: 404, description: "Category not found." })
    async delete(@Param() params: FindOneParamsDto) {
        return await this.categoriesService.delete(params.id);
    }

    @Get(":id")
    @ApiOperation({ summary: "Get a category by ID" })
    @ApiParam({ name: "id", description: "ID of the category to retrieve" })
    @ApiResponse({
        status: 200,
        description: "The category has been successfully retrieved.",
        type: CategoryDto,
    })
    @ApiResponse({ status: 404, description: "Category not found." })
    async getOne(@Param() params: FindOneParamsDto) {
        return this.categoriesService.findOne(params.id);
    }

    @Get()
    @ApiOperation({ summary: "Get all categories" })
    @ApiResponse({
        status: 200,
        description: "Return all categories.",
        type: [CategoryDto],
    })
    async getAll() {
        return this.categoriesService.findAll();
    }

    @Put(":id")
    @ApiOperation({ summary: "Update a category by ID" })
    @ApiParam({ name: "id", description: "ID of the category to update" })
    @ApiResponse({
        status: 200,
        description: "The category has been successfully updated.",
        type: CategoryDto,
    })
    @ApiResponse({ status: 404, description: "Category not found." })
    @ApiBody({ type: UpdateCategoryDto })
    async update(
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Param() params: FindOneParamsDto,
    ) {
        return await this.categoriesService.update(
            params.id,
            updateCategoryDto,
        );
    }
}
