import { Body, Controller, Get, Post } from "@nestjs/common";
import { ColorsService } from "./colors.service";
import { CreateColorDto } from "./dto/create-color.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ColorDto } from "./dto/color.dto";

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
}
