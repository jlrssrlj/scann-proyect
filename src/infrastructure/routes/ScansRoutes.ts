import { Router } from "express";
import { ScanAdapter } from "../adapter/ScanAdapter";
import { ScanAplicationService } from "../../application/ScanAplicationServices";
import { ScanController } from "../controller/ScanControlador";

const router = Router();
const scanAdapter = new ScanAdapter();
const scanAppService = new ScanAplicationService(scanAdapter);
const scanController = new ScanController(scanAppService);

router.post("/scans", (req, res) => scanController.createScan(req, res));
router.get("/scans", (req, res) => scanController.getAllScans(req, res));
router.get("/scans/:id", (req, res) => scanController.getScanById(req, res));
router.delete("/scans/:id", (req, res) => scanController.deleteScan(req, res));

export default router;
