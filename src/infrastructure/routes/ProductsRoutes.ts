import { Router } from "express";
import { ProductAdapter } from "../adapter/ProductsAdapter";
import { ProductAplicationService } from "../../application/ProductAplicationService";
import { ProductController } from "../controller/ProductControlador";

const router = Router();

// Se inician las capas
const productAdapter = new ProductAdapter();
const productAppService = new ProductAplicationService(productAdapter);
const productController = new ProductController(productAppService);

// Rutas con manejo de errores
router.post("/products", async (req, res) => {
  try {
    await productController.createProduct(req, res);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el producto", error });
  }
});

router.get("/products", async (req, res) => {
  try {
    await productController.getAllProducts(req, res);
  } catch (error) {
    res.status(400).json({ message: "Error al obtener los productos", error });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    await productController.getProductById(req, res);
  } catch (error) {
    res.status(400).json({ message: "Error al obtener el producto", error });
  }
});

router.get("/products-name/:name", async (req, res) => {
  try {
    await productController.getProductByname(req, res);
  } catch (error) {
    res.status(400).json({ message: "Error al obtener el producto por nombre", error });
  }
});

router.get("/products-category/:category_id", async (req, res) => {
  try {
    await productController.getProductsByCategory(req, res);
  } catch (error) {
    res.status(400).json({ message: "Error al obtener productos por categoría", error });
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    await productController.updateProduct(req, res);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el producto", error });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    await productController.deleteProduct(req, res);
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar el producto", error });
  }
});

export default router;
