// app.ts
import express from "express";
import UserRoutes from "../routes/UserRoutes";
import RoleRoutes from "../routes/RoleRoutes"; // 👈 Importa las rutas de roles

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
    this.app.use("/api", RoleRoutes); // 👈 Añade la ruta aquí
  }

  getApp() {
    return this.app;
  }
}

export default new App().getApp();



