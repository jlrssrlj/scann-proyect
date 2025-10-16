import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-base";
import { ScanEntities } from "../entities/ScanEntities";
import { ScanPort } from "../../domain/ScanPorts";
import { User } from "../entities/User";
import { ProductsEntities } from "../entities/ProductsEntities";

export class ScanAdapter implements ScanPort {
  private readonly repository: Repository<ScanEntities>;
  private readonly userRepo: Repository<User>;
  private readonly productRepo: Repository<ProductsEntities>;

  constructor() {
    this.repository = AppDataSource.getRepository(ScanEntities);
    this.userRepo = AppDataSource.getRepository(User);
    this.productRepo = AppDataSource.getRepository(ProductsEntities);
  }

  async getAllScans(): Promise<ScanEntities[]> {
    return await this.repository.find({
      relations: ["user", "product"],
      order: { scan_time: "DESC" },
    });
  }

  async getScanById(id: number): Promise<ScanEntities | null> {
    return await this.repository.findOne({
      where: { id_scans: id },
      relations: ["user", "product"],
    });
  }

  async createScan(data: Partial<ScanEntities>): Promise<ScanEntities> {
    let userEntity: User | null = null;
    if (data.user?.id_users) {
      userEntity = await this.userRepo.findOne({ where: { id_users: data.user.id_users } });
      if (!userEntity) throw new Error("User not found");
    }

    let productEntity: ProductsEntities | null = null;
    if (data.product?.id_products) {
      productEntity = await this.productRepo.findOne({ where: { id_products: data.product.id_products } });
      if (!productEntity) throw new Error("Product not found");
    }

    const newScan = this.repository.create({
      scan_time: data.scan_time ?? new Date(),
      confidence_score: data.confidence_score ?? null,
      user: userEntity,
      product: productEntity,
    });

    return await this.repository.save(newScan);
  }

  async deleteScan(id: number): Promise<void> {
    await this.repository.delete({ id_scans: id });
  }
}
