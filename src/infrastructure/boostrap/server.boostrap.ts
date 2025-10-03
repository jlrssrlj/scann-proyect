import http from "http";
import express  from "express";
import { rejects } from "assert";
export class ServerBoostrap{
    //declaracion de atributos
    private app: express.Application;
    constructor(app:express.Application){
        this.app=app;
    }
    init():Promise<boolean>{
        return new Promise(() =>{

            const server = http.createServer(this.app);
            const PORT = process.env.PORT || 4000;
            server.listen(PORT).on("listening",()=>{
                console.log(`Server is running on port ${PORT}`);
            })
            .on("error", (err)=>{
                console.log(`Server is running on port ${err}`);
            })
        })       
    }
}