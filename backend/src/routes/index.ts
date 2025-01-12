import { Express, Request, Response, Router } from "express";
import { RegisterController } from "./Register/RegisterController";

export class Routes {

    private readonly router: Router;

    constructor (app: Express) {
        this.router = Router();
        this.setupRoutes();
    }

    private setupRoutes() {  
        this.router.post("/register", (req: Request, res: Response) => {
            try {
                return new RegisterController().handle(req, res);
            } catch (error) {
                console.log(error);
                res.status(500).send("Internal server error: " + error);
            }
        });
    }

    get routes() {
        return this.router;
    }

}

export default Routes;