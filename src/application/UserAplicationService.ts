import { UserPort } from "../domain/UserPorts";
import { User } from "../domain/User";

export class UserAplicationService {
    private port: UserPort;

    constructor(port: UserPort) {
        this.port = port;
    }

    async createUser(user: Omit<User, "id_users">): Promise<number> {
        const existingUser = await this.port.getUserByemail(user.email);
        if (!existingUser) {
            return await this.port.createUser(user);
        }
        throw new Error("Ese usuario ya existe");
    }

    async getUserByid(id: number): Promise<User | null> {
        return await this.port.getUserByid(id);
    }

    async getUserByemail(email: string): Promise<User | null> {
        return await this.port.getUserByemail(email);
    }

    async getAllUser(): Promise<User[]> {
        return await this.port.getAllUser();
    }

    async updateUser(id: number, user: Partial<User>): Promise<boolean> {
        const existingUser = await this.port.getUserByid(id);
        if (!existingUser) {
            throw new Error("User not found");
        }

        if (user.email) {
            const emailTaken = await this.port.getUserByemail(user.email);
            if (emailTaken && emailTaken.id_users !== id) {
                throw new Error("Email ya existe");
            }
        }

        return await this.port.updateUser(id, user);
    }

    async deleteUser(id: number): Promise<boolean> {
        const existingUser = await this.port.getUserByid(id);
        if (!existingUser) {
            throw new Error("User not found");
        }
        return await this.port.deleteUser(id);
    }

    /** 🔐 Nuevo método de login */
    async login(email: string, password: string): Promise<User | null> {
        const user = await this.port.getUserByemail(email);

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        // Comparación simple (sin hash, puedes añadir bcrypt luego)
        if (user.password_hash !== password) {
            throw new Error("Contraseña incorrecta");
        }

        return user; // Devuelve el usuario autenticado
    }
}
