import express, { Request, Response } from "express";
import path from "path";
import { userService } from "../../domain/userService";

const app = express();


app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req: Request, res: Response)=>{
    res.sendFile(path.join(__dirname,"views","home.html"));
});

app.get("/login", (req: Request, res: Response)=>{
    res.sendFile(path.join(__dirname,"views", "login.html"));
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.register(name, email, password);
    res.json({ success: true, user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    res.json({ success: true, user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default app;
