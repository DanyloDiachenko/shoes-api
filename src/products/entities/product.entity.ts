import { BrandEntity } from "src/brands/entities/brand.entity";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { ColorEntity } from "src/colors/entity/color.entity";
import { ReviewEntity } from "src/reviews/entity/review.entity";
import { SizeEntity } from "src/sizes/entity/size.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class ProductEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column("int")
    quantityInStock: number;

    @Column("decimal")
    priceUah: number;

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
    priceWithDiscountUah?: number;

    @Column({ type: "decimal", nullable: true })
    priceWithDiscountEur?: number;

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
