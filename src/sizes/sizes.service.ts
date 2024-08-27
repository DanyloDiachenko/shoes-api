import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SizeEntity } from "./entity/size.entity";
import { CreateSizeDto } from "./dto/create-size.dto";

@Injectable()
export class SizesService {
    constructor(
        @InjectRepository(SizeEntity)
        private readonly sizesRepository: Repository<SizeEntity>,
    ) {}

    async create(createSizeDto: CreateSizeDto) {
        const size = this.sizesRepository.create(createSizeDto);

        await this.sizesRepository.save(size);

        return size;
    }

    async findAll() {
        const sizes = await this.sizesRepository.find();

        return sizes;
    }
}
