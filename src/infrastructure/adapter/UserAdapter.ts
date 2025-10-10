import { Repository } from "typeorm";
import { User as userDomain } from "../../domain/User";
import { User as UserEntity } from "../entities/User"
import { UserPort } from "../../domain/UserPorts";
import { AppDataSource } from "../config/data-base";


export class UserAdapter implements UserPort{
    private userRepository: Repository<UserEntity>
    constructor(){
        this.userRepository = AppDataSource.getRepository(UserEntity)
    }
    private toDomain(user:UserEntity): userDomain{
        return{
            id_users: user.id_users,
            name: user.name,
            email: user.email,
            password_hash: user.password_hash,
            create_at: user.created_at,
            role_id: user.role.id

        };
    }
    private toEntity(user: Omit<userDomain, "id">): UserEntity{
        const userEntity = new UserEntity;
        userEntity.name = user.name;
        userEntity.email = user.email;
        userEntity.password_hash = user.password_hash;
        userEntity.created_at = user.create_at;
        userEntity.role= { id: user.role_id} as any
        return userEntity;
    }

    async createUser(user: Omit<userDomain, "id">): Promise<number> {
        try {
            const newUser = this.toEntity(user);
            const savedUser = await this.userRepository.save(newUser);
            return savedUser.id_users;
        } catch (error) {
            console.error("Error creando usuario")
            throw new Error("Erros creating users")
        }
    }
    async getUserByid(id: number): Promise<userDomain | null> {
        try {
            const user = await this.userRepository.findOne({where: {id_users:id}})
            return user ? this.toDomain(user): null;
        } catch (error) {
            console.error("error obteniendo usuario")
            throw new Error("Error getting user")
        }
    }
    async getUserByemail(email: string): Promise<userDomain | null> {
        try {
            const useremail = await this.userRepository.findOne({where: {email: email}})
            return useremail ? this.toDomain(useremail): null;
        } catch (error) {
            console.error("error obteniendo usuario por email")
            throw new Error("error getting user by email")

        }
    }
    async updateUser(id: number, user: Partial<userDomain>): Promise<boolean> {
        try {
            const existingUser = await this.userRepository.findOne({where:{id_users:id}})
            if(!existingUser){
                throw new Error("user not found")
            }
            Object.assign(existingUser,{
                name: user.name ?? existingUser.name,
                email: user.email ?? existingUser.email,
                password_hash: user.password_hash ?? existingUser.password_hash,
                created_at: user.create_at ?? existingUser.created_at,
                role: user.role_id ? {id: user.role_id} as any: existingUser.role
            });
        await this.userRepository.save(existingUser);
        return true;
        } catch (error) {
            console.error("Error al actualizar")
            throw new Error("Error updating user")
        }
    }
    async deleteUser(id: number): Promise<boolean> {
        try {
            const result = await this.userRepository.delete(id)
            return result.affected ! == 0;
        } catch (error) {
            console.error("Error eliminando usuario");
            throw new Error("Error deliting user");
            
        }
    }
    async getAllUser(): Promise<userDomain[]> {
        try {
            const users = await this.userRepository.find();
            return users.map((u) => this.toDomain(u))
        } catch (error) {
            console.error("esta mal perro no funciona")
            throw new Error("Erros creating users")
        }
    }

}