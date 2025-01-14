import {NextFunction, Request, Response, Router} from "express";
import { RegisterController } from "../controllers/Register/RegisterController";
import { LoginController } from "../controllers/Login/LoginController";
import {LogoutController} from "../controllers/Logout/LogoutController";

export class Routes {

    private readonly router: Router;

    constructor () {
        this.router = Router();
        this.setupRoutes();
    }

    private setupRoutes() {
        const isAuthenticated = (req: Request, res:Response, next:NextFunction) => {
            if(req.isAuthenticated()) {
                return next();
            }
            res.status(401).json({success: false, message: "Unauthorized"});
        }

        this.router.post("/register", (req: Request, res: Response) => {
            try {
                return new RegisterController().handle(req, res);
            } catch (error) {
                console.log(error);
                res.status(500).send("Internal server error: " + error);
            }
        });
        this.router.post("/login", (req: Request, res: Response) => {
            return new LoginController().handle(req, res);
        });
        this.router.get("/", isAuthenticated, (req: Request, res: Response) => {
            if(req.isAuthenticated()) {
                res.status(200).json({ success: true, user: req.user});
                return;
            }
            res.status(401).json({ success: true, user: req.user});
        });
        this.router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
            return new LogoutController().handle(req, res, next);
        });
    }

    get routes() {
        return this.router;
    }

}

export default Routes;