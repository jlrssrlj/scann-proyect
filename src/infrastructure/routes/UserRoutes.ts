import { Router } from "express";
import { UserAdapter } from "../adapter/UserAdapter";
import { UserAplicationService } from "../../application/UserAplicationService";
import { UserController } from "../controller/UserControlador";

const router = Router();

//se inician las capas
const userAdapter = new UserAdapter();
const userAppservice = new UserAplicationService(userAdapter);
const userController = new UserController(userAppservice);

//Ruta de manejo de errores

router.post("/users", async(req, res) =>{
    try {
        await userController.createUser(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error en la creación", error })
        
    }
});
router.get("/users", async(req, res) =>{
    try {
        await userController.getAllUsers(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener los usuarios", error })
        
    }
});
router.get("/users/:id", async(req, res) =>{
    try {
        await userController.getUserByid(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener el usuario", error })
        
    }
});

router.get("/users-email/:email", async(req, res) =>{
    try {
        await userController.getUserByEmail(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener el usuario por email", error })
        
    }
});
router.delete("/users/:id", async (req, res) => {
    try {
        await userController.deleteUser(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al eliminar el usuario", error });
    }
});
export default router;
