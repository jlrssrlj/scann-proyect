import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Role } from "../entities/role"
import { CategoriesEntities } from "../entities/CategoriesEntities";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, //solo en desarrollo, en prod usa migraciones
    logging: true,
    entities: [User,Role, CategoriesEntities],
});

// conectar a la bd
export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Conectado a PostgreSQL");
    } catch (error) {
        console.error("Error al conectar a PostgreSQL:", error);
        process.exit(1); // detiene la app si no hay conexión
    }
};
