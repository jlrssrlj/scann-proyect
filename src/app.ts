// se gestionan las rutas
import express, {request, response, type Request,type Response } from "express";

class App{
  private app: express.Application;

  constructor(){
    this.app = express();
    this.routes();
  }
  
  private routes():void{
    // definir ruta principal
      this.app.get("/", (request: Request, response: Response) => {
        response.send("¡Hola desde Express con TypeScript!");
      });

      this.app.get("/api", (request:Request, response: Response) =>{
        response.send("check");
      });

      this.app.get("/adriana", (request:Request, response: Response) =>{
        response.send("queriendo a adriana");
      });
      this.app.get("/adrian", (request:Request, response: Response) =>{
        response.send("adrian");
      });
      

  }
  getApp(){
    return this.app;
  }
}
export default new App().getApp();




