import { Repository } from "typeorm";
import { Role as RoleEntity } from "../entities/role";
import { AppDataSource } from "../config/data-base";
import { RolePort } from "../../domain/RolePort";
import { role as RoleDomain } from "../../domain/role";

export class RoleAdapter implements RolePort {
  private roleRepository: Repository<RoleEntity>;

  constructor() {
    this.roleRepository = AppDataSource.getRepository(RoleEntity);
  }

  private toDomain(entity: RoleEntity): RoleDomain {
    return {
      id_role: entity.id,
      name: entity.name,
    };
  }
  private toEntity(role: Omit<RoleDomain,"id">): RoleEntity{
    const roleEntity = new RoleEntity;
    roleEntity.name = role.name
    return roleEntity
  }

  async createRole(role: Omit<RoleDomain, "id_roles">): Promise<number> {
    const newRole = this.roleRepository.create({ name: role.name });
    const saved = await this.roleRepository.save(newRole);
    return saved.id;
  }

  async getRoleById(id: number): Promise<RoleDomain | null> {
    const role = await this.roleRepository.findOneBy({ id });
    return role ? this.toDomain(role) : null;
  }

  async getRoleByName(name: string): Promise<RoleDomain | null> {
    const role = await this.roleRepository.findOneBy({ name });
    return role ? this.toDomain(role) : null;
  }

  async updateRole(id: number, role: Partial<RoleDomain>): Promise<boolean> {
    const result = await this.roleRepository.update({ id }, role);
    return result.affected !== 0;
  }

  async deleteRole(id: number): Promise<boolean> {
    const result = await this.roleRepository.delete({ id });
    return result.affected !== 0;
  }

  async getAllRoles(): Promise<RoleDomain[]> {
    const roles = await this.roleRepository.find();
    return roles.map((r) => this.toDomain(r));
  }
}
