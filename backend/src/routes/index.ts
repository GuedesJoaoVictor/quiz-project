import { Express, Request, Response, Router } from "express";
import { RegisterController } from "../controllers/Register/RegisterController";
import { LoginController } from "../controllers/Login/LoginController";
import passport from "../configs/PassportConfig/passportConfig"
import LoginResponseData from "../models/Login/LoginResponseData";

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
        this.router.post("/login", (req: Request, res: Response) => {
            passport.authenticate("local", (err: Error, user: LoginResponseData, info: any) => {
                if (err) {
                    return res.status(500).json({ success: false, message: {err} });
                }
                if (!user) {
                    return res.status(401).json({ success: false, message: info?.message || "Invalid credentials" });
                }

                // Log in the user
                req.logIn(user, (loginErr: Error) => {
                    if (loginErr) {
                        return res.status(500).json({ success: false, message: "Login failed" });
                    }
                    return res.json({ success: true, user: { id: user.id, username: user.username } });
                });
            })(req, res);
        });
    }

    get routes() {
        return this.router;
    }

}

export default Routes;