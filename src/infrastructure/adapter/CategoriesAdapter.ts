import { Repository } from "typeorm";
import { CategoriesPort } from "../../domain/CategoriesPorts";
import { AppDataSource } from "../config/data-base";
import { CategoriesEntities } from "../entities/CategoriesEntities";
import { Categories } from "../../domain/Categories";

export class CategoriesAdapter implements CategoriesPort{
    private categoriesRepository: Repository<CategoriesEntities>

    constructor(){
        this.categoriesRepository =AppDataSource.getRepository(CategoriesEntities);
    }

    private toDomain(entity:CategoriesEntities): Categories{
        return{
            id_categories: entity.id_categories,
            name_categories: entity.name_categories
        }
    }
    private toEntity(categories: Omit<Categories, "id_categories">): CategoriesEntities {
        const entity = new CategoriesEntities();
        entity.name_categories = categories.name_categories; 
        return entity;
    }
    async createCategories(categories: Omit<Categories, "id_categories">): Promise<number> {
    const entity = this.toEntity(categories);
    const saved = await this.categoriesRepository.save(entity);
    return saved.id_categories;
    }

    async getCategoriesId(id_categories: number): Promise<Categories | null> {
        const categorie = await this.categoriesRepository.findOneBy({ id_categories})
        return categorie ? this.toDomain(categorie): null;
    }
    async getCategoriesByName(name_categories: string): Promise<Categories | null> {
    const categorie = await this.categoriesRepository.findOneBy({ name_categories });
    return categorie ? this.toDomain(categorie) : null;
    }
    async updateCategories(id_categories: number, categorie: Partial<Categories>): Promise<boolean> {
        const result = await this.categoriesRepository.update({ id_categories }, categorie)
        return result.affected !== 0;
    }
    async deleteCategories(id_categories: number): Promise<boolean> {
        const result = await this.categoriesRepository.delete({ id_categories});
        return result.affected !==0
        
    }
    async getAllCategories(): Promise<Categories[]> {
        const categorie = await this.categoriesRepository.find();
        return categorie.map((r)=> this.toDomain(r))
    }

}