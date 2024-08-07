import { FavoriteEntity } from "src/favorites/entities/favorite.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
    favorites: FavoriteEntity[]

    /* @Column()
    orders: relation to orders */

    /* @Column()
    history: relation to history */

    /* @Column
    address: relation to address */
}
