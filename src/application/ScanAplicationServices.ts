import { ScanPort } from "../domain/ScanPorts";
import { Scan } from "../domain/Scan";
import { User } from "../infrastructure/entities/User";
import { ProductsEntities } from "../infrastructure/entities/ProductsEntities";

export class ScanAplicationService {
  private port: ScanPort;

  constructor(port: ScanPort) {
    this.port = port;
  }

  async createScan(scan: Omit<Scan, "id_scan">): Promise<number> {
    const userEntity = scan.user_id ? new User() : null;
    if (userEntity) userEntity.id_users = scan.user_id;

    const productEntity = scan.product_id ? new ProductsEntities() : null;
    if (productEntity) productEntity.id_products = scan.product_id;

    const result = await this.port.createScan({
      scan_time: new Date(scan.scan_time),
      confidence_score: scan.confidence_score,
      user: userEntity,
      product: productEntity,
    });

    return result.id_scans;
  }

  async getScanById(id: number): Promise<Scan | null> {
    const entity = await this.port.getScanById(id);
    if (!entity) return null;

    return {
      id_scan: entity.id_scans,
      user_id: entity.user ? entity.user.id_users : 0,
      product_id: entity.product ? entity.product.id_products : 0,
      scan_time: new Date(entity.scan_time),
      confidence_score: Number(entity.confidence_score ?? 0),
    };
  }

  async getAllScans(): Promise<Scan[]> {
    const entities = await this.port.getAllScans();

    return entities.map(entity => ({
      id_scan: entity.id_scans,
      user_id: entity.user ? entity.user.id_users : 0,
      product_id: entity.product ? entity.product.id_products : 0,
      scan_time: new Date(entity.scan_time),
      confidence_score: Number(entity.confidence_score ?? 0),
    }));
  }

  async deleteScan(id: number): Promise<boolean> {
    const existingScan = await this.port.getScanById(id);
    if (!existingScan) throw new Error("Scan not found");

    await this.port.deleteScan(id);
    return true;
  }
}
