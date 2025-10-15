import { Request, Response } from "express";
import { ScanAplicationService } from "../../application/ScanAplicationServices";
import { Scan } from "../../domain/Scan";

export class ScanController {
    private app: ScanAplicationService;

    constructor(app: ScanAplicationService) {
        this.app = app;
    }

    async createScan(req: Request, res: Response): Promise<Response> {
        try {
            const { user_id, product_id, confidence_score } = req.body;

            if (!user_id || !product_id || confidence_score === undefined)
                return res.status(400).json({ error: "Faltan datos obligatorios" });

            const scan: Omit<Scan, "id_scans"> = {
                user_id,
                product_id,
                scan_time: new Date().toISOString(),
                confidence_score,
            };

            const id = await this.app.createScan(scan);
            return res.status(201).json({ message: "Scan creado", id });
        } catch (error) {
            return res.status(500).json({ error: "Error creando scan", details: error instanceof Error ? error.message : error });
        }
    }

    async getScanById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

            const scan = await this.app.getScanById(id);
            if (!scan) return res.status(404).json({ error: "Scan no encontrado" });

            return res.status(200).json(scan);
        } catch (error) {
            return res.status(500).json({ error: "Error obteniendo scan" });
        }
    }

    async getAllScans(req: Request, res: Response): Promise<Response> {
        try {
            const scans = await this.app.getAllScans();
            return res.status(200).json(scans);
        } catch (error) {
            return res.status(500).json({ error: "Error obteniendo scans" });
        }
    }

    async deleteScan(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

            const deleted = await this.app.deleteScan(id);
            if (!deleted) return res.status(404).json({ error: "Scan no encontrado" });

            return res.status(200).json({ message: "Scan eliminado" });
        } catch (error) {
            return res.status(500).json({ error: "Error eliminando scan" });
        }
    }
}
