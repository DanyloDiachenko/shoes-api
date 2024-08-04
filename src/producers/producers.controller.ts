import { Controller, Delete, Get, Post } from "@nestjs/common";

@Controller("producers")
export class ProducersController {
    constructor() {}

    @Post()
    async create() {}

    @Get()
    async getAll() {}

    @Get()
    async getOne() {}

    @Post()
    async update() {}

    @Delete()
    async delete() {}
}
