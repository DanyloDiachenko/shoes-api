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
import { FindOneParamsDto } from "helpers/find-one-params.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";

@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async findAll(
        @Query("category") category?: string,
        @Query("producer") producer?: string,
        @Query("page") page: number = 1,
        @Query("limit") limit: number = 5,
    ) {
        return this.productsService.findAll(category, producer, page, limit);
    }

    @Get(":id")
    async findeOne(@Param() params: FindOneParamsDto) {
        return await this.productsService.findOne(params.id);
    }

    @Delete(":id")
    async delete(@Param() params: FindOneParamsDto) {
        return await this.productsService.delete(params.id);
    }

    @Put(":id")
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
