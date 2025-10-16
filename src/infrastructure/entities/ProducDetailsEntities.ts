import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ProductsEntities } from "./ProductsEntities";

@Entity({ name: "product_details" })
export class ProductDetailsEntity {
    @PrimaryGeneratedColumn({ name: "id_productdetails" })
    id_productdetails!: number;

    @Column({ type: "int" })
    product_id!: number;

    @ManyToOne(() => ProductsEntities, { onDelete: "CASCADE" })
    @JoinColumn({ name: "product_id" })
    product!: ProductsEntities;

    @Column({ type: "text" })
    ingredients!: string;

    @Column({ type: "jsonb" })
    nutritional_info!: any;

    @Column({ type: "text", nullable: true })
    warnings!: string;
}
