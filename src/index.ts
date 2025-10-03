import "./infrastructure/config/envairoment-vars"
import app from "./app";
import { ServerBoostrap } from "./infrastructure/boostrap/server.boostrap";
import { connectDB } from "./infrastructure/config/data-base";

/**
 * Iniciacion de servidor con tipo htpp
 */

const server = new ServerBoostrap(app);
/**
 * funcion flecha y suo del async await para iniciar el servidor
 
const start = async () =>{
    try {
        const instance = [server.init()];
        await Promise.all(instance);
    } catch (error) {
        console.error('Error starting server', error)
        
    }
}
start();*/
( async () =>{
    try{
        await connectDB();
        const instances = [server.init()];
        await Promise.all(instances);
    }catch(error){
        console.error(error)
        process.exit(1)
    }
}

)();