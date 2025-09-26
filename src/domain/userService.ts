import bcrypt from "bcrypt";
import pool from "../config/db";
import { User, UserRepository } from "../ports/userRpository";

class PgUserRepository implements UserRepository {
  async createUser(user: User): Promise<User> {
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, role_id, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING id, name, email`,
      [user.name, user.email, user.password_hash, user.role_id || 1]
    );
    return result.rows[0];
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows.length ? result.rows[0] : null;
  }
}

export class UserService {
  private repo: UserRepository;

  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  async register(name: string, email: string, password: string) {
    const exist = await this.repo.findByEmail(email);
    if (exist) throw new Error("El correo ya está registrado");

    const hash = await bcrypt.hash(password, 10);
    return await this.repo.createUser({
        name, email, password_hash: hash,
        role_id: 0
    });
  }

  async login(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) throw new Error("Contraseña incorrecta");

    return { id: user.id, name: user.name, email: user.email };
  }
}

export const userService = new UserService(new PgUserRepository());
