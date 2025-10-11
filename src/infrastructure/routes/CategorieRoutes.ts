import { Router } from "express";
import { CategoriesAdapter } from "../adapter/CategoriesAdapter";
import { CategorieAplicationService } from "../../application/CategorieAplicationServices";
import { CategoriesController } from "../controller/CategoriesControlador";

const router = Router();
const categoriaAdapter = new CategoriesAdapter();
const categoriaAppService = new CategorieAplicationService(categoriaAdapter);
const categoriaController = new CategoriesController(categoriaAppService);

router.post("/categorias", async (req, res)=>{
    try {
        await categoriaController.createCategorie(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error en la creación del rol", error });
    }
});

router.get("/categorias", async (req, res)=>{
    try {
        await categoriaController.getAllCategories(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener las categorias", error });
    }
});
router.get("/categorias/:id", async (req, res) => {
    try {
        await categoriaController.getCategorieId(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener el categorias", error });
    }
});
router.get("/categorias-name/:name_categories", async (req, res) => {
    try {
        await categoriaController.getCategorieName(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener nombre de la categoria", error });
    }
});
router.put("/categorias/:id", async (req, res) => {
    try {
        await categoriaController.updateCategorie(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar la categoria", error });
    }
});

router.delete("/categorias/:id", async (req, res) => {
    try {
        await categoriaController.deleteCategorie(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al eliminar la categoria", error });
    }
});

export default router;