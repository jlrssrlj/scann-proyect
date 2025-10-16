import { ScanPort } from "../domain/ScanPorts";
import { Scan } from "../domain/Scan";

export class ScanAplicationService {
    private port: ScanPort;

    constructor(port: ScanPort) {
        this.port = port;
    }

    // Crear un nuevo escaneo
    async createScan(scan: Omit<Scan, "id_scans">): Promise<number> {
    
        return await this.port.createScan(scan);
    }

    // Obtener un escaneo por ID
    async getScanById(id: number): Promise<Scan | null> {
        return await this.port.getScanById(id);
    }

    // Obtener todos los escaneos
    async getAllScans(): Promise<Scan[]> {
        return await this.port.getAllScan();
    }

    // Eliminar escaneo
    async deleteScan(id: number): Promise<boolean> {
        const existingScan = await this.port.getScanById(id);
        if (!existingScan) {
            throw new Error("Scan not found");
        }
        return await this.port.deleteScan(id);
    }
}
