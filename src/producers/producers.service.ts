import { InjectRepository } from "@nestjs/typeorm";
import { ProducerEntity } from "./entities/producer.entity";
import { Repository } from "typeorm";
import { CreateProducerDto } from "./dto/create-producer.dto";
import { NotFoundException } from "@nestjs/common";
import { UpdateProducerDto } from "./dto/update-producer.dto";

export class ProducersService {
    constructor(
        @InjectRepository(ProducerEntity)
        private readonly producersRepository: Repository<ProducerEntity>,
    ) {}

    async create(createProducerDto: CreateProducerDto) {
        const newProducer =
            await this.producersRepository.create(createProducerDto);

        return await this.producersRepository.save(newProducer);
    }

    async delete(id: string) {
        const producerToDelete = await this.producersRepository.findOne({
            where: { id },
        });

        if (!producerToDelete) {
            throw new NotFoundException(`Producer with ID ${id} not found`);
        }

        return await this.producersRepository.remove(producerToDelete);
    }

    async getOne(id: string) {
        const findedProducer = await this.producersRepository.findOne({
            where: { id },
        });

        if (!findedProducer) {
            throw new NotFoundException(`Producer with ID ${id} not found`);
        }

        return findedProducer;
    }

    async getAll() {
        return await this.producersRepository.find();
    }

    async update(id: string, updateProducerDto: UpdateProducerDto) {
        const producerToUpdate = await this.producersRepository.findOne({
            where: { id },
        });

        if (!producerToUpdate) {
            throw new NotFoundException(`Producer with ID ${id} not found`);
        }

        const updatedProducer = this.producersRepository.merge(
            producerToUpdate,
            updateProducerDto,
        );

        return await this.producersRepository.save(updatedProducer);
    }
}
