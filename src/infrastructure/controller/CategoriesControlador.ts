import { CategorieAplicationService } from "../../application/CategorieAplicationServices";
import { Request, response, Response } from "express";

export class CategoriesController{
    private app: CategorieAplicationService;

    constructor(app: CategorieAplicationService){
        this.app = app
    }

    async createCategorie(req: Request, res: Response){
        try {
            const categorie = req.body;
            const result = await this.app.createCategories(categorie);
            res.status(201).json({message: "Categoria creada exitosamente", result})
        } catch (error: any) {
            res.status(400).json({message: error.message})
        }
    }

    async getAllCategories(req: Request, res: Response){
        try {
            const categorie = await this.app.getAllCategories();
            res.status(201).json({categorie})
        } catch (error: any) {
            res.status(400).json({message: error.message})
        }
    }
    async getCategorieId(req: Request, res: Response){
        try {
            const id = Number(req.params.id)
            const categorie = await this.app.getCategorieById(id)
            if(!categorie){
                return res.status(404).json({message: "Categoria no encontrada"})
            }
            res.status(200).json(categorie)
        } catch (error:any) {
            res.status(400).json({ message: error.message})
            
        }
    }
    async getCategorieName(req: Request, res: Response){
        try {
            const name_categorie = req.params.name_categories
            const categorie = await this.app.getCategoriesByName(name_categorie)
            if(!categorie){
                return res.status(404).json({message: "Categoria no encontrada"})
            }
            return res.status(200).json(categorie)
        } catch (error: any) {
            res.status(400).json({ message: error.message})
        }
    }
    async updateCategorie(req: Request, res: Response){
        try {
            const id_categorie = Number(req.params.id)
            const categorie = req.body;
            const result = await this.app.updateCategorie(id_categorie, categorie);
            res.status(200).json({message: "Categoria actualizada", result});
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    async deleteCategorie(req: Request, res: Response){
        try {
            const id = Number(req.params.id);
            const result = await this.app.deleteCategorie(id);
            res.status(200).json({ message: "Categoria eliminada", result });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}