import { Request, Response } from "express";
import { ProductAplicationService } from "../../application/ProductAplicationService";

export class ProductController {
  private app: ProductAplicationService;

  constructor(app: ProductAplicationService) {
    this.app = app;
  }

  async createProduct(req: Request, res: Response) {
    try {
      const product = req.body;
      const result = await this.app.createProduct(product);
      res.status(201).json({ message: "Producto creado exitosamente", result });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await this.app.getAllProduct();
      res.status(200).json(products);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const product = await this.app.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.status(200).json(product);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getProductByname(req: Request, res: Response) {
    try {
      const name = req.params.name;
      const product = await this.app.getProductByname(name);
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.status(200).json(product);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getProductsByCategory(req: Request, res: Response) {
    try {
      const category_id = Number(req.params.category_id);
      const products = await this.app.getProductsByCategory(category_id);
      res.status(200).json(products);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const product = req.body;
      const result = await this.app.updateProduct(id, product);
      res.status(200).json({ message: "Producto actualizado", result });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await this.app.deleteProduct(id);
      res.status(200).json({ message: "Producto eliminado", result });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
