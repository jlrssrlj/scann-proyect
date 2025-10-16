import { Request, Response } from "express";
import { ScanAplicationService } from "../../application/ScanAplicationServices";

export class ScanController {
  private service: ScanAplicationService;

  constructor(service: ScanAplicationService) {
    this.service = service;
  }

  async createScan(req: Request, res: Response): Promise<void> {
    try {
      const scanData = req.body;
      const id = await this.service.createScan(scanData);
      res.status(201).json({ id });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getScanById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const scan = await this.service.getScanById(id);
      if (!scan) {
        res.status(404).json({ message: "Scan not found" });
        return;
      }
      res.json(scan);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllScans(req: Request, res: Response): Promise<void> {
    try {
      const scans = await this.service.getAllScans();
      res.json(scans);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteScan(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const success = await this.service.deleteScan(id);
      if (!success) {
        res.status(404).json({ message: "Scan not found" });
        return;
      }
      res.status(200).json({ message: "Scan deleted" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
