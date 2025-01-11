import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ColorEntity } from "./entity/color.entity";
import { CreateColorDto } from "./dto/create-color.dto";
import { ProductEntity } from "src/products/entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ColorsService {
    constructor(
        @InjectRepository(ColorEntity)
        private readonly colorsRespository: Repository<ColorEntity>,
    ) {}

    async create(createColorDto: CreateColorDto) {
        const color = this.colorsRespository.create(createColorDto);

        return await this.colorsRespository.save(color);
    }

    async findAll() {
        return await this.colorsRespository.find();
    }

    async delete(colorId: string) {
        return await this.colorsRespository.delete({ id: colorId });
    }
}
