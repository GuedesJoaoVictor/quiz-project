import e, { Express } from "express";
import { Request, Response } from "express";

const PORT = 8080;

const app: Express = e(); 

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Server is initialized on port: http://localhost:${PORT}`)
})