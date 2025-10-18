import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn({ name: "id_roles" })
    id!: number;

    @Column({ type: "varchar", length: 100, unique: true })
    name!: string;   // ejemplo: "admin", "cajero", "mesero"

    @OneToMany(() => User, (user) => user.role)
    users!: User[];
}
