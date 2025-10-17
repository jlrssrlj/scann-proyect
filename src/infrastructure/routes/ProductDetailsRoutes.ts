import { Router } from "express";
import { ProductDetailsAdapter } from "../adapter/ProductDetailsAdapter";
import { ProductDetailsApplicationService } from "../../application/ProductDetailsServices";
import { ProductDetailsController } from "../controller/ProductDetailsControlador";

const router = Router();

const adapter = new ProductDetailsAdapter();
const service = new ProductDetailsApplicationService(adapter);
const controller = new ProductDetailsController(service);

router.post("/product-details", (req, res) => controller.create(req, res));
router.get("/product-details", (req, res) => controller.getAll(req, res));
router.get("/product-details/:id", (req, res) => controller.getById(req, res));
router.get("/product-details/product/:product_id", (req, res) => controller.getByProductId(req, res));
router.put("/product-details/:id", (req, res) => controller.update(req, res));
router.delete("/product-details/:id", (req, res) => controller.delete(req, res));

export default router;
