import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { BrandEntity } from "src/brands/entities/brand.entity";

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

    @Column()
    color: string;

    @Column({ type: "decimal", nullable: true })
    discountPercentage?: number;

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    category: CategoryEntity;

    @ManyToOne(() => BrandEntity, (brand) => brand.products)
    brand: BrandEntity;
}
