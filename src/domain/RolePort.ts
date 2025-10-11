import { role } from "./role";

export interface RolePort {
    createRole(role: Omit<role, "id_role">): Promise<number>;
    getRoleById(id: number): Promise<role | null>;
    getRoleByName(name: string): Promise<role | null>;
    updateRole(id: number, role: Partial<role>): Promise<boolean>;
    deleteRole(id: number): Promise<boolean>;
    getAllRoles(): Promise<role[]>;
}
