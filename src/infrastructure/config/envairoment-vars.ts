/**
 * Modulo que se encarga de cargar variables de entorno .env. validarlas con joi para asegurar que tengan los formatos esperados
 * 
 */

import Joi from "joi";

//definir las varibales de entorno
export type ReturnEnvironmentVarts ={
    PORT: number;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_PORT: number;
}
//validación
type ValidationEnviromentVars = {
    error: Joi.ValidationError | undefined;
    value: ReturnEnvironmentVarts;
    
}
function validateEnVars(vars:NodeJS.ProcessEnv): ValidationEnviromentVars{
    const envSchema = Joi.object({
        PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_USER: Joi.string().required(),
    }).unknown(true);
    const {error,value} = envSchema.validate(vars);
    return {error, value};
}
/**
 * Loadenvvars: carga de variables de entorno desde el archivo .env y las valida
 * @return Un objeto con las variables de entorno validadas
 */
const loadEnvVars = (): ReturnEnvironmentVarts =>{
    const result = validateEnVars(process.env);
    if(result.error){
        throw new Error(`Error validation enviroment ${result.error.message}`)
    }
    const value = result.value;
    return{
        PORT: value.PORT,
        DB_HOST: value.DB_HOST,
        DB_PORT: value.DB_PORT,
        DB_PASSWORD: value.DB_PASSWORD,
        DB_NAME: value.DB_NAME,
        DB_USER: value.DB_USER
    }
}