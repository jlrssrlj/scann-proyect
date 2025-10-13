// app.ts
import express from "express";
import UserRoutes from "../routes/UserRoutes";
import RoleRoutes from "../routes/RoleRoutes"; 
import CategorieRoutes from "../routes/CategorieRoutes"
import ProductsRoutes from "../routes/ProductsRoutes"

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use("/api", UserRoutes);
    this.app.use("/api", RoleRoutes);
    this.app.use("/api", CategorieRoutes);
    this.app.use("/api", ProductsRoutes)
  }

  getApp() {
    return this.app;
  }
}

export default new App().getApp();



