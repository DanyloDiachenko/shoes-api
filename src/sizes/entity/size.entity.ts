import { ProductEntity } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("sizes")
export class SizeEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: number;

    @Column({ unique: true })
    slug: number;

    @ManyToOne(() => ProductEntity, (product) => product.sizes)
    product: ProductEntity;
}
