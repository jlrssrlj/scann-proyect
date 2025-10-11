import { Categories } from "./Categories";

export interface CategoriesPort{
    createCategories(Categories: Omit<Categories, "id_categories">): Promise <number>;
    getCategoriesId(id_categories:number):Promise<Categories | null>;
    getCategoriesByName(name_categories:string):Promise<Categories | null>;
    updateCategories(id_categories:number, categorie: Partial<Categories>): Promise<boolean>;
    deleteCategories(id_categories:number):Promise<boolean>;
    getAllCategories(): Promise<Categories[]>
}