import { Request, Response } from "express";
import { UserAplicationService } from "../../application/UserAplicationService";
import { User } from "../../domain/User";

export class UserController {
    private app: UserAplicationService;

    constructor(app: UserAplicationService) {
        this.app = app;
    }

    async createUser(req: Request, res: Response) {
        const { name, email, password } = req.body;

        try {
            const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/;
            if (!nameRegex.test(name.trim())) {
                return res.status(400).json({ message: "Nombre no válido" });
            }

            if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                return res.status(400).json({ error: "Correo no válido" });
            }

            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/.test(password)) {
                return res.status(400).json({
                    error: "La contraseña debe tener al menos 6 caracteres, incluyendo al menos una letra y un número"
                });
            }

            const status = 1;
            const role_id = 2;
            const create_at = new Date();

            const user: Omit<User, "id"> = { 
                name, 
                email, 
                password,                  
                role_id, 
                create_at 
            };

            const userId = await this.app.createUser(user);
            return res.status(201).json({ message: "Usuario registrado", id: userId });

        } catch (error: any) {
            if (error instanceof Error) {
                return res.status(500).json({ error: "Error en el servidor", details: error.message });
            }
        }
    }
}
