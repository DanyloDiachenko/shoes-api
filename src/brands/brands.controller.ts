import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from "@nestjs/common";
import { BrandsService } from "./brands.service";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { FindOneParamsDto } from "helpers/find-one-params.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBody,
} from "@nestjs/swagger";
import { BrandDto } from "./dto/brand.dto";

@ApiTags("brands")
@Controller("brands")
export class BrandsController {
    constructor(private readonly brandsService: BrandsService) {}

    @Post()
    @ApiOperation({ summary: "Create a new brand" })
    @ApiResponse({
        status: 201,
        description: "Brand created successfully",
        type: BrandDto,
    })
    @ApiResponse({
        status: 400,
        description: "Bad request",
    })
    async create(@Body() createBrandDto: CreateBrandDto) {
        return await this.brandsService.create(createBrandDto);
    }

    @Get()
    @ApiOperation({ summary: "Get all brands" })
    @ApiResponse({
        status: 200,
        description: "Return all brands",
        type: [BrandDto],
    })
    async getAll() {
        return await this.brandsService.getAll();
    }

    @Get(":id")
    @ApiOperation({ summary: "Get a brand by ID" })
    @ApiParam({ name: "id", description: "ID of the brand to retrieve" })
    @ApiResponse({
        status: 200,
        description: "Brand retrieved successfully",
        type: BrandDto,
    })
    @ApiResponse({ status: 404, description: "Brand not found" })
    async getOne(@Param() params: FindOneParamsDto) {
        return await this.brandsService.getOne(params.id);
    }

    @Put(":id")
    @ApiOperation({ summary: "Update a brand by ID" })
    @ApiParam({ name: "id", description: "ID of the brand to update" })
    @ApiBody({ type: UpdateBrandDto })
    @ApiResponse({
        status: 200,
        description: "Brand updated successfully",
        type: BrandDto,
    })
    @ApiResponse({ status: 404, description: "Brand not found" })
    async update(
        @Param() params: FindOneParamsDto,
        @Body() updateBrandDto: UpdateBrandDto,
    ) {
        return await this.brandsService.update(params.id, updateBrandDto);
    }

    @Delete(":id")
    @ApiOperation({ summary: "Delete a brand by ID" })
    @ApiParam({ name: "id", description: "ID of the brand to delete" })
    @ApiResponse({
        status: 200,
        description: "Brand deleted successfully",
        example: { success: true },
    })
    @ApiResponse({ status: 404, description: "Brand not found" })
    async delete(@Param() params: FindOneParamsDto) {
        return await this.brandsService.delete(params.id);
    }
}
