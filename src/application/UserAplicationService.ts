import { UserPort } from "../domain/UserPorts";
import { User } from "../domain/User";
import { error } from "console";

export class UserAplicationService{
    private port: UserPort;
    constructor(port: UserPort){
        this.port=port;
    }
    async createUser(user: Omit<User,"id">): Promise<number>{
        const existingUser = await this.port.getUserByemail(user.email)
        if(!existingUser){
            return await this.port.createUser(user)
        }
        throw new Error("Ese usuario ya existe")
    }
    async getUserByid(id: number): Promise<User | null>{
        return await this,this.port.getUserByid(id)
    }
    async getUserByemail(email: string): Promise<User | null>{
        return await this,this.port.getUserByemail(email)
    }
    async getAllUser(): Promise<User[]>{
        return await this,this.port.getAllUser()
    }
     async updateUser(id: number, user: Partial<User>): Promise<boolean>{
        const existingUser = await this.port.getUserByid(id);
        if (!existingUser){
            throw new Error("User no found")
        }
        if (user.email){
            const emailTaken= await this.port.getUserByemail(user.email);
            if(emailTaken && emailTaken.id !== id){
                throw new Error("email existe")
            }

        }
        return await this.port.updateUser(id,user);
        
    }
    async deleteuser(id:number): Promise<boolean>{
        const existingUser = await this.port.getUserByid(id);
        if(!existingUser){
            throw new Error("user no found");
        }
        return await this.port.deleteUser(id);
    }


}