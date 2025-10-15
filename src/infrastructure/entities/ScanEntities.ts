// src/infrastructure/entities/ScanEntities.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { ProductsEntities } from "./ProductsEntities";

@Entity({ name: "scans" })
export class ScanEntities {
    @PrimaryGeneratedColumn({ name: "id_scans" })
    id_scans!: number;

    @Column({ type: "int", nullable: true })
    user_id!: number;

    @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column({ type: "int", nullable: true })
    product_id!: number;

    @ManyToOne(() => ProductsEntities, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "product_id" })
    product!: ProductsEntities;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    scan_time!: Date;

    @Column({ type: "numeric", precision: 5, scale: 2 })
    confidence_score!: number;
}

