import { Controller, Delete, Get, Post, Put } from "@nestjs/common";

@Controller("addresses")
export class AddressesController {
    constructor() {}

    @Post()
    async create() {}

    @Get(":id")
    async getAllByUserId() {}

    @Delete(":id")
    async delete() {}

    @Put(":id")
    async update() {}
}
