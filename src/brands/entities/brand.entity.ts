import { ProductEntity } from "src/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("brands")
export class BrandEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column({ unique: true })
    slug: string;

    @OneToMany(() => ProductEntity, (product) => product.brand)
    products: BrandEntity[];
}
