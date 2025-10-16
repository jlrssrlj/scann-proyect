import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { ProductsEntities } from "./ProductsEntities";

@Entity({ name: "scans" })
export class ScanEntities {
  @PrimaryGeneratedColumn({ name: "id_scans" })
  id_scans!: number;

  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: "user_id" })
  user!: User | null;

  @ManyToOne(() => ProductsEntities, { nullable: true, eager: true })
  @JoinColumn({ name: "product_id" })
  product!: ProductsEntities | null;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  scan_time!: Date;

  @Column({ type: "numeric", precision: 5, scale: 2, nullable: true })
  confidence_score!: number | null;
}
