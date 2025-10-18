import { Repository } from "typeorm";
import { User as userDomain } from "../../domain/User";
import { User as UserEntity } from "../entities/User";
import { UserPort } from "../../domain/UserPorts";
import { AppDataSource } from "../config/data-base";

export class UserAdapter implements UserPort {
    private userRepository: Repository<UserEntity>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(UserEntity);
    }

    private toDomain(user: UserEntity): userDomain {
        return {
            id_users: user.id_users,
            name: user.name,
            email: user.email,
            password_hash: user.password_hash,
            create_at: user.created_at,
            role_id: user.role.id,  // Corregido: usar 'id' de Role
        };
    }

    private toEntity(user: Omit<userDomain, "id_users">): UserEntity {
        const userEntity = new UserEntity();
        userEntity.name = user.name;
        userEntity.email = user.email;
        userEntity.password_hash = user.password_hash;
        userEntity.created_at = user.create_at;
        userEntity.role = { id: user.role_id } as any;  // Corregido
        return userEntity;
    }

    async createUser(user: Omit<userDomain, "id_users">): Promise<number> {
         try {
    const newUser = this.toEntity(user);
    console.log("📦 Usuario recibido para crear:", newUser); // 👈 Agrega esto
    const savedUser = await this.userRepository.save(newUser);
    return savedUser.id_users;
     } catch (error) {
    console.error("❌ Error creando usuario:", error);
    throw new Error("Error creating user");
     }
    }


    async getUserByid(id: number): Promise<userDomain | null> {
        try {
            const user = await this.userRepository.findOne({ where: { id_users: id } });
            return user ? this.toDomain(user) : null;
        } catch (error) {
            console.error("Error obteniendo usuario:", error);
            throw new Error("Error getting user");
        }
    }

    async getUserByemail(email: string): Promise<userDomain | null> {
        try {
            const useremail = await this.userRepository.findOne({ where: { email: email } });
            return useremail ? this.toDomain(useremail) : null;
        } catch (error) {
            console.error("Error obteniendo usuario por email:", error);
            throw new Error("Error getting user by email");
        }
    }

    async updateUser(id: number, user: Partial<userDomain>): Promise<boolean> {
        try {
            const existingUser = await this.userRepository.findOne({ where: { id_users: id } });
            if (!existingUser) {
                throw new Error("User not found");
            }
            Object.assign(existingUser, {
                name: user.name ?? existingUser.name,
                email: user.email ?? existingUser.email,
                password_hash: user.password_hash ?? existingUser.password_hash,
                created_at: user.create_at ?? existingUser.created_at,
                role: user.role_id ? ({ id: user.role_id } as any) : existingUser.role,  // Corregido
            });
            await this.userRepository.save(existingUser);
            return true;
        } catch (error) {
            console.error("Error al actualizar:", error);
            throw new Error("Error updating user");
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        try {
            const result = await this.userRepository.delete({ id_users: id });
            return result.affected !== 0;
        } catch (error) {
            console.error("Error eliminando usuario:", error);
            throw new Error("Error deleting user");
        }
    }

    async getAllUser(): Promise<userDomain[]> {
        try {
            const users = await this.userRepository.find();
            return users.map((u) => this.toDomain(u));
        } catch (error) {
            console.error("Error obteniendo todos los usuarios:", error);
            throw new Error("Error getting all users");
        }
    }

    /** LOGIN */
    async login(email: string, password: string): Promise<userDomain | null> {
        try {
            const user = await this.userRepository.findOne({ where: { email } });

            if (!user) {
                console.warn("Usuario no encontrado con ese email");
                return null;
            }

            if (user.password_hash !== password) {
                console.warn("Contraseña incorrecta para el usuario:", email);
                return null;
            }

            return this.toDomain(user);
        } catch (error) {
            console.error("Error en login:", error);
            throw new Error("Error logging in");
        }
    }
}
