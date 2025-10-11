import { CategoriesPort } from "../domain/CategoriesPorts";
import { Categories } from "../domain/Categories";

export class CategorieAplicationService{
    private port: CategoriesPort;

    constructor(port: CategoriesPort){
        this.port = port;
    }
    async createCategories(categorie: Omit<Categories, "id_categories">): Promise<number>{
        const existingCategorie = await this.port.getCategoriesByName(categorie.name_categories);
        if(!existingCategorie){
            return await this.port.createCategories(categorie)
        }
        throw new Error("La categoria ya existe")
    }
    async getCategorieById(id_categories:number): Promise<Categories| null>{
        return await this.port.getCategoriesId(id_categories);
    }
    async getAllCategories(): Promise<Categories[]>{
        return await this.port.getAllCategories();
    }
    async getCategoriesByName(name_categories: string): Promise <Categories | null >{
        return await this.port.getCategoriesByName(name_categories)
    }
    async updateCategorie(id_categorie: number, categories: Partial<Categories>): Promise<boolean>{
        const existingCategorie = await this.port.getCategoriesId(id_categorie);
        if(!existingCategorie){
            throw new Error(" Categories not found ");
        }
        if(categories.name_categories){
            const nameTaken = await this.port.getCategoriesByName(categories.name_categories);
            if (nameTaken && nameTaken.id_categories !== id_categorie) {
                throw new Error("La categoria ya existe")
            }
        }
        return await this.port.updateCategories(id_categorie, categories)
    }
    async deleteCategorie(id_categorie: number): Promise<boolean>{
        const existingCategorie = await this.port.getCategoriesId(id_categorie)
        if(!existingCategorie){
            throw new Error(" Categories not found ");
        }
        return await this.port.deleteCategories(id_categorie)
    }

}