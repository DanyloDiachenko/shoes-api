import { UserEntity } from "src/users/entites/user.entity";
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("favorites")
export class FavoriteEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    mainImage: string;

    @ManyToOne(() => UserEntity, (user) => user.favorites)
    user: UserEntity;
}
