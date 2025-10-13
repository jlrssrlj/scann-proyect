import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CategoriesEntities } from "./CategoriesEntities";

@Entity("products")
export class ProductsEntities {
  @PrimaryGeneratedColumn({ name: "id_products" })
  id_products!: number;

  @Column({ type: "varchar", length: 150, unique: true })
  name_products!: string;

  @Column({ type: "text", nullable: true })
  description!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  image_url!: string;

  @ManyToOne(() => CategoriesEntities)
  @JoinColumn({ name: "category_id" })
  category!: CategoriesEntities;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;
}
