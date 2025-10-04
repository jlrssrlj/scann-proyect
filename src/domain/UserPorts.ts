import { User } from "./User";

export interface UserPort{
    createUser(user:Omit<User,"id">):Promise<number>;
    getUserByid(id:number):Promise<User | null>;
    getUserByemail(email: string):Promise<User | null>;
    updateUser(id:number, user: Partial<User>): Promise<boolean>;
    deleteUser(id:number):Promise<boolean>;
    getAllUser(): Promise<User[]>;
}