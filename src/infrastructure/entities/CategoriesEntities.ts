import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("categories")
export class CategoriesEntities{
    @PrimaryGeneratedColumn({name: "id_categories"})
    id_categories!: number;

    @Column({type: "varchar", length: 100, unique:true})
    name_categories! : string;
}