import { ProductEntity } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CategoryEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    title: string;

    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[];
}
