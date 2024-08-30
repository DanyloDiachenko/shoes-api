import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { BrandEntity } from "src/brands/entities/brand.entity";
import { ReviewEntity } from "src/reviews/entity/review.entity";
import { ColorEntity } from "src/colors/entity/color.entity";
import { SizeEntity } from "src/sizes/entity/size.entity";

@Entity("products")
export class ProductEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column("int")
    quantityInStock: number;

    @Column("decimal")
    priceUsd: number;

    @Column("decimal")
    priceEur: number;

    @Column()
    mainImage: string;

    @Column()
    productInformtion: string;

    @Column()
    additionalInformation: string;

    @Column("int")
    purchasedNumber: number;

    @Column("simple-array")
    images: string[];

    @ManyToOne(() => ColorEntity, (color) => color.product)
    color: ColorEntity;

    @Column({ type: "decimal", nullable: true })
    discountPercentage?: number;

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    mainCategory: CategoryEntity;

    @ManyToMany(() => CategoryEntity)
    @JoinTable()
    categories: CategoryEntity[];

    @ManyToOne(() => BrandEntity, (brand) => brand.products)
    brand: BrandEntity;

    @OneToMany(() => ReviewEntity, (review) => review.product)
    reviews: ReviewEntity[];

    @OneToMany(() => SizeEntity, (size) => size.product)
    sizes: SizeEntity[];
}
