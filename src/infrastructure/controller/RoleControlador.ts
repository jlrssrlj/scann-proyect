import { Request, Response } from "express";
import { RoleAplicationService } from "../../application/RoleAplicationsService";

export class RoleController {
    private app: RoleAplicationService;

    constructor(app: RoleAplicationService) {
        this.app = app;
    }

    async createRole(req: Request, res: Response) {
        try {
            const role = req.body;
            const result = await this.app.createRole(role);
            res.status(201).json({ message: "Rol creado exitosamente", result });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllRoles(req: Request, res: Response) {
        try {
            const roles = await this.app.getAllRoles();
            res.status(200).json(roles);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getRoleById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const role = await this.app.getRoleById(id);
            if (!role) {
                return res.status(404).json({ message: "Rol no encontrado" });
            }
            res.status(200).json(role);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getRoleByName(req: Request, res: Response) {
        try {
            const name = req.params.name;
            const role = await this.app.getRoleByName(name);
            if (!role) {
                return res.status(404).json({ message: "Rol no encontrado" });
            }
            res.status(200).json(role);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateRole(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const role = req.body;
            const result = await this.app.updateRole(id, role);
            res.status(200).json({ message: "Rol actualizado", result });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteRole(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const result = await this.app.deleteRole(id);
            res.status(200).json({ message: "Rol eliminado", result });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
