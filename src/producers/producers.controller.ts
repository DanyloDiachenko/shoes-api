import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from "@nestjs/common";
import { ProducersService } from "./producers.service";
import { CreateProducerDto } from "./dto/create-producer.dto";
import { FindOneParamsDto } from "helpers/find-one-params.dto";
import { UpdateProducerDto } from "./dto/update-producer.dto";
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBody,
} from "@nestjs/swagger";
import { ProducerDto } from "./dto/producer.dto";

@ApiTags("producers")
@Controller("producers")
export class ProducersController {
    constructor(private readonly producersService: ProducersService) {}

    @Post()
    @ApiOperation({ summary: "Create a new producer" })
    @ApiResponse({
        status: 201,
        description: "Producer created successfully",
        type: ProducerDto,
    })
    @ApiResponse({
        status: 400,
        description: "Bad request",
    })
    async create(@Body() createProducerDto: CreateProducerDto) {
        return await this.producersService.create(createProducerDto);
    }

    @Get()
    @ApiOperation({ summary: "Get all producers" })
    @ApiResponse({
        status: 200,
        description: "Return all producers",
        type: [ProducerDto],
    })
    async getAll() {
        return await this.producersService.getAll();
    }

    @Get(":id")
    @ApiOperation({ summary: "Get a producer by ID" })
    @ApiParam({ name: "id", description: "ID of the producer to retrieve" })
    @ApiResponse({
        status: 200,
        description: "Producer retrieved successfully",
        type: ProducerDto,
    })
    @ApiResponse({ status: 404, description: "Producer not found" })
    async getOne(@Param() params: FindOneParamsDto) {
        return await this.producersService.getOne(params.id);
    }

    @Put(":id")
    @ApiOperation({ summary: "Update a producer by ID" })
    @ApiParam({ name: "id", description: "ID of the producer to update" })
    @ApiBody({ type: UpdateProducerDto })
    @ApiResponse({
        status: 200,
        description: "Producer updated successfully",
        type: ProducerDto,
    })
    @ApiResponse({ status: 404, description: "Producer not found" })
    async update(
        @Param() params: FindOneParamsDto,
        @Body() updateProducerDto: UpdateProducerDto,
    ) {
        return await this.producersService.update(params.id, updateProducerDto);
    }

    @Delete(":id")
    @ApiOperation({ summary: "Delete a producer by ID" })
    @ApiParam({ name: "id", description: "ID of the producer to delete" })
    @ApiResponse({
        status: 200,
        description: "Producer deleted successfully",
        example: { success: true },
    })
    @ApiResponse({ status: 404, description: "Producer not found" })
    async delete(@Param() params: FindOneParamsDto) {
        return await this.producersService.delete(params.id);
    }
}
