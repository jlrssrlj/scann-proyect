// app.ts
import express from "express";
import cors from "cors"; // 👈 importa cors
import UserRoutes from "../routes/UserRoutes";
import RoleRoutes from "../routes/RoleRoutes"; 
import CategorieRoutes from "../routes/CategorieRoutes";
import ProductsRoutes from "../routes/ProductsRoutes";
import ScansRoutes from "../routes/ScansRoutes";
import ProductDetailsRoutes from "../routes/ProductDetailsRoutes"

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.app.use(express.json());

    
    this.app.use(cors({
      origin: "http://localhost:5173", // tu frontend
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true
    }));
  }

  private routes(): void {
    this.app.use("/api", UserRoutes);
    this.app.use("/api", RoleRoutes);
    this.app.use("/api", CategorieRoutes);
    this.app.use("/api", ProductsRoutes);
    this.app.use("/api", ScansRoutes);
    this.app.use("/api", ProductDetailsRoutes);
  }

  getApp() {
    return this.app;
  }
}

export default new App().getApp();
