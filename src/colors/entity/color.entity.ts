import { ProductEntity } from "src/products/entities/product.entity";
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("colors")
export class ColorEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column({ unique: true })
    slug: string;

    @Column()
    hexCode: string;

    @OneToMany(() => ProductEntity, (product) => product.color)
    product: ProductEntity;
}
