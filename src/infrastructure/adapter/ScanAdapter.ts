import { Repository } from "typeorm";
import { ScanPort } from "../../domain/ScanPorts";
import { AppDataSource } from "../config/data-base";
import { ScanEntities as ScanEntity } from "../entities/ScanEntities";
import { Scan as ScanDomain } from "../../domain/Scan";

export class ScanAdapter implements ScanPort {
    private scanRepository: Repository<ScanEntity>;

    constructor() {
        this.scanRepository = AppDataSource.getRepository(ScanEntity);
    }

    private toDomain(scan: ScanEntity): ScanDomain {
    return {
        id_scans: scan.id_scans,
        user_id: scan.user?.id_users ?? null,
        product_id: scan.product?.id_products ?? null,
        scan_time: scan.scan_time.toISOString(), 
        confidence_score: Number(scan.confidence_score),
    };
}


private toEntity(scan: Omit<ScanDomain, "id_scans">): ScanEntity {
    const entity = new ScanEntity();
    entity.user = scan.user_id ? { id_users: scan.user_id } as any : null;
    entity.product = scan.product_id ? { id_products: scan.product_id } as any : null;
    entity.scan_time = new Date(scan.scan_time);
    entity.confidence_score = scan.confidence_score;
    return entity;
}



    async createScan(scan: Omit<ScanDomain, "id_scans">): Promise<number> {
        try {
            const newScan = this.toEntity(scan);
            const savedScan = await this.scanRepository.save(newScan);
            return savedScan.id_scans;
        } catch (error) {
            console.error("Error creando scan:", error);
            throw new Error("Error creating scan");
        }
    }

    async getScanById(id: number): Promise<ScanDomain | null> {
        try {
            const scan = await this.scanRepository.findOne({ where: { id_scans: id } });
            return scan ? this.toDomain(scan) : null;
        } catch (error) {
            console.error("Error obteniendo scan:", error);
            throw new Error("Error getting scan");
        }
    }

    async getAllScans(): Promise<ScanDomain[]> {
        try {
            const scans = await this.scanRepository.find();
            return scans.map((s) => this.toDomain(s));
        } catch (error) {
            console.error("Error obteniendo scans:", error);
            throw new Error("Error getting scans");
        }
    }

    async deleteScan(id: number): Promise<boolean> {
        try {
            const result = await this.scanRepository.delete({ id_scans: id });
            return result.affected !== 0;
        } catch (error) {
            console.error("Error eliminando scan:", error);
            throw new Error("Error deleting scan");
        }
    }
}
