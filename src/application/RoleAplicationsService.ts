import { RolePort } from "../domain/RolePort";
import { role } from "../domain/role";

export class RoleAplicationService {
    private port: RolePort;

    constructor(port: RolePort) {
        this.port = port;
    }

    async createRole(role: Omit<role, "id_role">): Promise<number> {
        const existingRole = await this.port.getRoleByName(role.name);
        if (!existingRole) {
            return await this.port.createRole(role);
        }
        throw new Error("Ese rol ya existe");
    }

    async getRoleById(id: number): Promise<role | null> {
        return await this.port.getRoleById(id);
    }

    async getAllRoles(): Promise<role[]> {
        return await this.port.getAllRoles();
    }

    async getRoleByName(name: string): Promise<role | null> {
        return await this.port.getRoleByName(name);
    }

    async updateRole(id: number, role: Partial<role>): Promise<boolean> {
        // Buscar el rol por id
        const existingRole = await this.port.getRoleById(id);
        if (!existingRole) {
            throw new Error("Role not found");
        }

        // Validar que el nombre no esté duplicado
        if (role.name) {
            const nameTaken = await this.port.getRoleByName(role.name);
            // Si existe otro rol con el mismo nombre y diferente id
            if (nameTaken && nameTaken.id_role !== id) {
                throw new Error("El nombre del rol ya existe");
            }
        }

        return await this.port.updateRole(id, role);
    }

    async deleteRole(id: number): Promise<boolean> {
        // Buscar el rol por id
        const existingRole = await this.port.getRoleById(id);
        if (!existingRole) {
            throw new Error("Role not found");
        }

        // Llamar al puerto para eliminar el rol
        return await this.port.deleteRole(id);
    }
}
