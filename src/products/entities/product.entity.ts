import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { BrandEntity } from "src/brands/entities/brand.entity";
import { ReviewEntity } from "src/reviews/entity/review.entity";
import { ColorEntity } from "src/colors/entity/color.entity";

@Entity("products")
export class ProductEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column("int")
    quantity: number;

    @Column("decimal")
    price: number;

    @Column()
    mainImage: string;

    @Column("simple-array")
    images: string[];

    @Column("int")
    size: number;

    @ManyToOne(() => ColorEntity, (color) => color.product)
    color: ColorEntity;

    @Column({ type: "decimal", nullable: true })
    discountPercentage?: number;

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    category: CategoryEntity;

    @ManyToOne(() => BrandEntity, (brand) => brand.products)
    brand: BrandEntity;

    @OneToMany(() => ReviewEntity, (review) => review.product)
    reviews: ReviewEntity[];
}
