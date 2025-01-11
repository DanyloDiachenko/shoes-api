import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { SizesService } from "./sizes.service";
import { CreateSizeDto } from "./dto/create-size.dto";
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { SizeDto } from "./dto/size.dto";
import { FindOneParamsDto } from "src/helpers/find-one-params.dto";

@ApiTags("sizes")
@Controller("sizes")
export class SizesController {
    constructor(private readonly sizesService: SizesService) {}

    @Post()
    @ApiOperation({ summary: "Create a new size" })
    @ApiBody({ type: CreateSizeDto })
    @ApiResponse({
        status: 201,
        description: "The size has been successfully created.",
        type: SizeDto,
    })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async create(@Body() createSizeDto: CreateSizeDto) {
        return await this.sizesService.create(createSizeDto);
    }

    @Get()
    @ApiOperation({ summary: "Retrieve all sizes" })
    @ApiResponse({
        status: 200,
        description: "Array of all sizes",
        type: [SizeDto],
    })
    async findAll() {
        return await this.sizesService.findAll();
    }

    @Delete(":id")
    @ApiOperation({ summary: "Delete a size by ID" })
    @ApiParam({ name: "id", description: "ID of the size to delete" })
    @ApiResponse({
        status: 200,
        description: "Size deleted successfully",
        example: { success: true },
    })
    @ApiResponse({ status: 404, description: "Size not found" })
    async delete(@Param() params: FindOneParamsDto) {
        await this.sizesService.delete(params.id);

        return { success: true };
    }
}
