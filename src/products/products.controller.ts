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
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiQuery,
    ApiBody,
} from "@nestjs/swagger";
import { ProductDto } from "./dto/product.dto";
import { ProductWithRatingDto } from "./dto/productWithRaiting.dto";

@ApiTags("products")
@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    @ApiOperation({ summary: "Get all products" })
    @ApiQuery({
        name: "categories",
        required: false,
        description: "Filter products by category slugs",
    })
    @ApiQuery({
        name: "page",
        required: false,
        description: "Page number",
        example: 1,
    })
    @ApiResponse({
        status: 200,
        description: "Return all products",
        type: [ProductWithRatingDto],
    })
    async findAll(
        @Query("page") page: string = "1",
        @Query("limit") limit: string = "6",
        @Query("categories") categories: string = "",
        @Query("sizes") sizes: string = "",
        @Query("color") color: string = "",
        @Query("brands") brands: string = "",
    ) {
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 6;
        const categoryArray = categories ? categories.split(",") : [];
        const sizeArray = sizes ? sizes.split(",") : [];
        const brandArray = brands ? brands.split(",") : [];

        return this.productsService.findAll(
            pageNumber,
            limitNumber,
            categoryArray,
            sizeArray,
            color,
            brandArray,
        );
    }

    @Get(":id")
    @ApiOperation({ summary: "Get a product by ID" })
    @ApiParam({ name: "id", description: "ID of the product to retrieve" })
    @ApiResponse({
        status: 200,
        description: "Product retrieved successfully",
        type: ProductWithRatingDto,
    })
    @ApiResponse({ status: 404, description: "Product not found" })
    async findOne(@Param() params: FindOneParamsDto) {
        return await this.productsService.findOne(params.id);
    }

    @Delete(":id")
    @ApiOperation({ summary: "Delete a product by ID" })
    @ApiParam({ name: "id", description: "ID of the product to delete" })
    @ApiResponse({
        status: 200,
        description: "Product deleted successfully",
        example: { sucess: true },
    })
    @ApiResponse({ status: 404, description: "Product not found" })
    async delete(@Param() params: FindOneParamsDto) {
        return await this.productsService.delete(params.id);
    }

    @Put(":id")
    @ApiOperation({ summary: "Update a product by ID" })
    @ApiParam({ name: "id", description: "ID of the product to update" })
    @ApiBody({ type: UpdateProductDto })
    @ApiResponse({
        status: 200,
        description: "Product updated successfully",
        type: ProductWithRatingDto,
    })
    @ApiResponse({ status: 404, description: "Product not found" })
    async update(
        @Body() updateProductDto: UpdateProductDto,
        @Param() params: FindOneParamsDto,
    ) {
        return await this.productsService.update(params.id, updateProductDto);
    }

    @Post()
    @ApiOperation({ summary: "Create a new product" })
    @ApiBody({ type: CreateProductDto })
    @ApiResponse({
        status: 201,
        description: "Product created successfully",
        type: ProductDto,
    })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async create(@Body() createProductDto: CreateProductDto) {
        return await this.productsService.create(createProductDto);
    }
}
