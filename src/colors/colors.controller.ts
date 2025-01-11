import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ColorsService } from "./colors.service";
import { CreateColorDto } from "./dto/create-color.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ColorDto } from "./dto/color.dto";
import { FindOneParamsDto } from "src/helpers/find-one-params.dto";

@ApiTags("colors")
@Controller("colors")
export class ColorsController {
    constructor(private readonly colorsService: ColorsService) {}

    @Post()
    @ApiOperation({ summary: "Create a new color" })
    @ApiBody({ type: CreateColorDto })
    @ApiResponse({
        status: 201,
        description: "The color has been successfully created.",
        type: ColorDto,
    })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async create(@Body() createColorDto: CreateColorDto) {
        return await this.colorsService.create(createColorDto);
    }

    @Get()
    @ApiOperation({ summary: "Retrieve all colors" })
    @ApiResponse({
        status: 200,
        description: "Array of all colors",
        type: [ColorDto],
    })
    async findAll() {
        return await this.colorsService.findAll();
    }

    @Delete()
    @ApiOperation({ summary: "Delete color" })
    @ApiResponse({
        status: 200,
        description: "Color has been deleted",
    })
    @ApiResponse({ status: 404, description: "Color not found" })
    async delete(@Param() params: FindOneParamsDto) {
        return await this.colorsService.delete(params.id);
    }
}
