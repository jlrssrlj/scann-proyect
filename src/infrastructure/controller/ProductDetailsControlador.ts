import { Request, Response } from "express";
import { ProductDetailsApplicationService } from "../../application/ProductDetailsServices";

export class ProductDetailsController {
    private app: ProductDetailsApplicationService;

    constructor(app: ProductDetailsApplicationService) {
        this.app = app;
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const id = await this.app.create(data);
            res.status(201).json({ message: "Detalles de producto creados", id });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const result = await this.app.getAll();
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const result = await this.app.getById(id);
            if (!result) return res.status(404).json({ message: "No encontrado" });
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getByProductId(req: Request, res: Response) {
        try {
            const product_id = Number(req.params.product_id);
            const result = await this.app.getByProductId(product_id);
            if (!result) return res.status(404).json({ message: "No encontrado" });
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const data = req.body;
            const updated = await this.app.update(id, data);
            res.status(200).json({ message: "Detalles actualizados", updated });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const deleted = await this.app.delete(id);
            res.status(200).json({ message: "Detalles eliminados", deleted });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
