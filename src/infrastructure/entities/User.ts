import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Role } from "../entities/role";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ name: "id_user" })
    id!: number;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email!: string;

    @Column({ type: "varchar", length: 255 })
    password_hash!: string;

    // Relación con roles
    @ManyToOne(() => Role, (role) => role.users, { eager: true }) 
    @JoinColumn({ name: "role_id" }) // FK en la tabla users
    role!: Role;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;
}
