export interface User{
    id?: number;
    name: string;
    email: string;
    password_hash: string;
    role_id: number;
    created_at?: Date;
}

export interface UserRepository {
  createUser(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}