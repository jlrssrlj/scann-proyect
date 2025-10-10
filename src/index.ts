import "./infrastructure/config/envairoment-vars"
import app from "./infrastructure/web/app";
import { ServerBoostrap } from "./infrastructure/boostrap/server.boostrap";
import { connectDB } from "./infrastructure/config/data-base";

/**
 * Iniciacion de servidor con tipo htpp
 */

const server = new ServerBoostrap(app);

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