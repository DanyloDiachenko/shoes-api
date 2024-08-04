import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { FindOneParamsDto } from "src/helpers/find-one-params.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";

@Controller("/products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async findAll(@Query("categoryId") categoryId?: string) {
        return this.productsService.findAll(categoryId);
    }

    @Get()
    async findeOne(@Param() params: FindOneParamsDto) {
        return await this.productsService.findOne(params.id);
    }

    @Delete()
    async delete(@Param() params: FindOneParamsDto) {
        return await this.productsService.delete(params.id);
    }

    @Put()
    async update(
        @Body() updateProductDto: UpdateProductDto,
        @Param() params: FindOneParamsDto,
    ) {
        return await this.productsService.update(params.id, updateProductDto);
    }

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        return await this.productsService.create(createProductDto);
    }
}
