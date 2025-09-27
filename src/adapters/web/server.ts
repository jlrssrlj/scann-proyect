import express, { Request, Response } from "express";
import path from "path";


const app = express();


app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req: Request, res: Response)=>{
    res.sendFile(path.join(__dirname,"views","home.html"));
});

app.get("/login", (req: Request, res: Response)=>{
    res.sendFile(path.join(__dirname,"views", "login.html"));
});

export default app;
