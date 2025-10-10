import { Request, Response } from "express";
import { UserAplicationService } from "../../application/UserAplicationService";
import { User } from "../../domain/User";

export class UserController {
    private app: UserAplicationService;

    constructor(app: UserAplicationService) {
        this.app = app;
    }

    async createUser(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        try {
            const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/;
            if (!nameRegex.test(name.trim())) {
                return res.status(400).json({ message: "Nombre no válido" });
            }

            if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                return res.status(400).json({ error: "Correo no válido" });
            }

            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&.,_-]{6,25}$/.test(password)) {
                return res.status(400).json({
                    error: "La contraseña debe tener al menos 6 caracteres, incluyendo al menos una letra y un número"
                });
            }

            const role_id = 2;
            const create_at = new Date();
            const password_hash = password; 

            const user: Omit<User, "id_users"> = {
                name,
                email,
                password_hash,
                role_id,
                create_at
            };

            const userId = await this.app.createUser(user);
            return res.status(201).json({ message: "Usuario registrado", id: userId });

        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: "Error en el servidor", details: error.message });
            }
            return res.status(500).json({ error: "Error en el servidor" });
        }
    }

    async getUserByid(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "El id debe ser un número válido" });

            const user = await this.app.getUserByid(id);
            if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

            return res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: "Error en el servidor", details: error.message });
            }
            return res.status(500).json({ error: "Error en el servidor" });
        }
    }

    async getUserByEmail(req: Request, res: Response): Promise<Response> {
        try {
            const { email } = req.params;
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
                return res.status(400).json({ error: "Correo electrónico no válido" });

            const user = await this.app.getUserByemail(email);
            if (!user)
                return res.status(404).json({ error: "Usuario no encontrado" });

            return res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: "Error en el servidor", details: error.message });
            }
            return res.status(500).json({ error: "Error en el servidor" });
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.app.getAllUser();
            if (users.length === 0) {
                return res.status(404).json(users);
            }
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: "Error al obtener los usuarios" });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "El id debe ser un número válido" });

            const deleted = await this.app.deleteUser(id); // ✅ corregido: deleteuser → deleteUser
            if (!deleted) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            return res.status(200).json({ message: "Usuario eliminado correctamente" });
        } catch (error) {
            return res.status(500).json({ error: "Error al eliminar el usuario" });
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "El id no es válido" });

            const { name, email, password, role_id, create_at } = req.body;

            if (name && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/.test(name.trim()))
                return res.status(400).json({ error: "El nombre no es válido" });

            if (email && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email.trim()))
                return res.status(400).json({ error: "Correo no válido" });

            if (password && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/.test(password.trim()))
                return res.status(400).json({
                    error: "La contraseña debe tener al menos 6 caracteres, incluyendo al menos una letra y un número"
                });

            if (role_id && (isNaN(role_id) || role_id <= 0))
                return res.status(400).json({ error: "El role_id debe ser un número positivo" });

            if (create_at && isNaN(Date.parse(create_at)))
                return res.status(400).json({ error: "La fecha de creación no es válida" });

            const userUpdate: Partial<User> = {};
            if (name) userUpdate.name = name.trim();
            if (email) userUpdate.email = email.trim();
            if (password) userUpdate.password_hash = password;
            if (role_id) userUpdate.role_id = role_id;
            if (create_at) userUpdate.create_at = new Date(create_at);

            const updated = await this.app.updateUser(id, userUpdate);
            if (!updated)
                return res.status(404).json({ error: "Usuario no encontrado" });

            return res.status(200).json({ message: "Usuario actualizado correctamente" });
        } catch (error) {
            if (error instanceof Error)
                return res.status(500).json({ error: "Error interno del servidor", details: error.message });

            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}
