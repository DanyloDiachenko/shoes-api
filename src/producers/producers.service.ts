import { InjectRepository } from "@nestjs/typeorm";
import { ProducerEntity } from "./entities/producer.entity";
import { Repository } from "typeorm";
import { CreateProducerDto } from "./dto/create-producer.dto";
import { ProductEntity } from "src/products/entities/product.entity";

export class ProducersService {
    constructor(
        @InjectRepository(ProducerEntity)
        private readonly producersRepository: Repository<ProducerEntity>,
        @InjectRepository(ProductEntity)
        private readonly productsRepository: Repository<ProductEntity>,
    ) {}

    async create(createProducerDto: CreateProducerDto) {}

    async getAll() {}

    async getOne() {}

    async update() {}

    async delete() {}
}
