import { Router } from "express";
import { ScanAdapter } from "../adapter/ScanAdapter";
import { ScanAplicationService } from "../../application/ScanAplicationServices";
import { ScanController } from "../controller/ScanControlador";

const router = Router();
const scanAdapter = new ScanAdapter();
const scanAppService = new ScanAplicationService(scanAdapter);
const scanController = new ScanController(scanAppService);

// Rutas con manejo de errores

// Crear un nuevo scan
router.post("/scans", async (req, res) => {
    try {
        await scanController.createScan(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error en la creación del scan", error });
    }
});

// Obtener todos los scans
router.get("/scans", async (req, res) => {
    try {
        await scanController.getAllScans(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener los scans", error });
    }
});

// Obtener scan por ID
router.get("/scans/:id", async (req, res) => {
    try {
        await scanController.getScanById(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener el scan", error });
    }
});

// Eliminar scan por ID
router.delete("/scans/:id", async (req, res) => {
    try {
        await scanController.deleteScan(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al eliminar el scan", error });
    }
});

export default router;
