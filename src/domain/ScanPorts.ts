import { Scan } from "./Scan";

export interface ScanPort {
    getScanById(id: number): Scan | PromiseLike<Scan | null> | null;
    createScan(scan: Omit<Scan, "id_scan">): Promise<number>;
    deleteScan(id: number): Promise<boolean>;
    getAllScan(): Promise<Scan[]>;

}
