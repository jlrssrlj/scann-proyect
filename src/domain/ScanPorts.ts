import { ScanEntities } from "../infrastructure/entities/ScanEntities";

export interface ScanPort {
  getAllScans(): Promise<ScanEntities[]>;
  getScanById(id: number): Promise<ScanEntities | null>;
  createScan(data: Partial<ScanEntities>): Promise<ScanEntities>;
  deleteScan(id: number): Promise<void>;
}
