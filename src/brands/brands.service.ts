import { InjectRepository } from "@nestjs/typeorm";
import { BrandEntity } from "./entities/brand.entity";
import { Repository } from "typeorm";
import { CreateBrandDto } from "./dto/create-brand.dto";
import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { UpdateBrandDto } from "./dto/update-brand.dto";

@Injectable()
export class BrandsService {
    constructor(
        @InjectRepository(BrandEntity)
        private readonly brandsRepository: Repository<BrandEntity>,
    ) {}

    async create(createBrandDto: CreateBrandDto) {
        const isExistingBrand = await this.brandsRepository.findOne({
            where: { slug: createBrandDto.slug },
        });

        if (!isExistingBrand) {
            const newBrand = await this.brandsRepository.create(createBrandDto);

            return this.brandsRepository.save(newBrand);
        }

        throw new BadRequestException(
            `Brand with Slug ${createBrandDto.slug} already exists`,
        );
    }

    async delete(id: string) {
        const brandToDelete = await this.brandsRepository.findOne({
            where: { id },
        });

        if (!brandToDelete) {
            throw new NotFoundException(`Brand with ID ${id} not found`);
        }

        await this.brandsRepository.remove(brandToDelete);

        return { success: true };
    }

    async getOne(id: string) {
        const findedBrand = await this.brandsRepository.findOne({
            where: { id },
        });

        if (!findedBrand) {
            throw new NotFoundException(`Brand with ID ${id} not found`);
        }

        return findedBrand;
    }

    async getAll() {
        return await this.brandsRepository.find();
    }

    async update(id: string, updateBrandDto: UpdateBrandDto) {
        const brandToUpdate = await this.brandsRepository.findOne({
            where: { id },
        });

        if (!brandToUpdate) {
            throw new NotFoundException(`Brand with ID ${id} not found`);
        }

        const updatedBrand = this.brandsRepository.merge(
            brandToUpdate,
            updateBrandDto,
        );

        return await this.brandsRepository.save(updatedBrand);
    }
}
