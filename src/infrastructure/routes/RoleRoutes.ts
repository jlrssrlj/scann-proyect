import { Router } from "express";
import { RoleAdapter } from "../adapter/RolesAdapter";
import { RoleAplicationService } from "../../application/RoleAplicationsService";
import { RoleController } from "../controller/RoleControlador";

const router = Router();

// Iniciar las capas
const roleAdapter = new RoleAdapter();
const roleAppService = new RoleAplicationService(roleAdapter);
const roleController = new RoleController(roleAppService);

// Rutas con manejo de errores

router.post("/roles", async (req, res) => {
    try {
        await roleController.createRole(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error en la creación del rol", error });
    }
});

router.get("/roles", async (req, res) => {
    try {
        await roleController.getAllRoles(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener los roles", error });
    }
});

router.get("/roles/:id", async (req, res) => {
    try {
        await roleController.getRoleById(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener el rol", error });
    }
});

router.get("/roles-name/:name", async (req, res) => {
    try {
        await roleController.getRoleByName(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener el rol por nombre", error });
    }
});

router.put("/roles/:id", async (req, res) => {
    try {
        await roleController.updateRole(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar el rol", error });
    }
});

router.delete("/roles/:id", async (req, res) => {
    try {
        await roleController.deleteRole(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al eliminar el rol", error });
    }
});

export default router;
