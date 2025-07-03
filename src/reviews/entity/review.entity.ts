import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entites/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("reviews")
export class ReviewEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    rating: number;

    @Column()
    helpfulNumber: number;

    @Column()
    unhelpfulNumber: number;

    @ManyToOne(() => ProductEntity, (product) => product.reviews)
    product: ProductEntity;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.reviews)
    user: UserEntity;
}
