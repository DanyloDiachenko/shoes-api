import { ProductEntity } from "src/products/entities/product.entity";
import {
    Column,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";

@Entity("categories")
@Unique(["slug"])
export class CategoryEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column({ unique: true })
    slug: string;

    @OneToMany(() => ProductEntity, (product) => product.mainCategory)
    products: ProductEntity[];

    @ManyToMany(() => ProductEntity, (product) => product.categories)
    additionalProducts: ProductEntity[];
}
