import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { ReviewEntity } from "./entity/review.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UserEntity } from "src/users/entites/user.entity";
import { ProductEntity } from "src/products/entities/product.entity";

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(ReviewEntity)
        private readonly reviewsRepository: Repository<ReviewEntity>,
        @InjectRepository(ProductEntity)
        private readonly productsRepository: Repository<ProductEntity>,
    ) {}

    async create(createReviewDto: CreateReviewDto, user: UserEntity) {
        const product = await this.productsRepository.findOne({
            where: { id: createReviewDto.productId },
            relations: ["reviews", "reviews.user"],
        });

        if (!product) {
            throw new NotFoundException(
                `Product with ID ${createReviewDto.productId} not found`,
            );
        }

        if (product.reviews.find((review) => review.user.id === user.id)) {
            throw new BadRequestException("You already reviewed this product");
        }

        const review = this.reviewsRepository.create({
            ...createReviewDto,
            user,
            helpfulNumber: 0,
            unhelpfulNumber: 0,
        });

        const savedReview = await this.reviewsRepository.save(review);

        product.reviews.push(savedReview);

        await this.productsRepository.save(product);

        return savedReview;
    }

    async changeBenefit(
        id: string,
        type: "increase" | "decrease",
    ) {
        if (type !== "increase" && type !== "decrease") {
            throw new BadRequestException("Invalid type");
        }

        const review = await this.reviewsRepository.findOne({ where: { id } });

        if (!review) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }

        switch (type) {
            case "increase": {
                review.helpfulNumber++;
                break;
            }
            case "decrease": {
                review.helpfulNumber--;
                break;
            }
        }

        return await this.reviewsRepository.save(review);
    }
}
