import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("favorites")
export class FavoriteEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    mainImage: string;
}
