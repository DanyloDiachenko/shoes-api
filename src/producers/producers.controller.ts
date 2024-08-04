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
import { FindOneParamsDto } from "src/helpers/find-one-params.dto";
import { UpdateProducerDto } from "./dto/update-producer.dto";

@Controller("producers")
export class ProducersController {
    constructor(private readonly producersService: ProducersService) {}

    @Post()
    async create(@Body() createProducerDto: CreateProducerDto) {
        return await this.producersService.create(createProducerDto);
    }

    @Get()
    async getAll() {
        return await this.producersService.getAll();
    }

    @Get(":id")
    async getOne(@Param() params: FindOneParamsDto) {
        return await this.producersService.getOne(params.id);
    }

    @Put(":id")
    async update(
        @Param() params: FindOneParamsDto,
        @Body() updateProducerDto: UpdateProducerDto,
    ) {
        return await this.producersService.update(params.id, updateProducerDto);
    }

    @Delete(":id")
    async delete(@Param() params: FindOneParamsDto) {
        return await this.producersService.delete(params.id);
    }
}
