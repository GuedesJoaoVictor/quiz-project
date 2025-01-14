import {NextFunction, Request, Response} from "express";
import pool from "../../configs/database";
import {QueryResult} from "pg";
import LoginResponseData from "../../models/Login/LoginResponseData";
import {compareSync} from "bcrypt";
import passport from "../../configs/PassportConfig/passportConfig";

class LoginController {
    async handle(req: Request, res: Response) {
        passport.authenticate("local", (err: Error, user: LoginResponseData) => {
            if (err) {
                return res.status(500).json({ success: false, message: {err} });
            }
            if (!user) {
                return res.status(401).json({ success: false, message: "Invalid credentials" });
            }

            req.logIn(user, (loginErr: Error) => {
                if (loginErr) {
                    return res.status(500).json({ success: false, message: "Login failed" });
                }
                return res.json({ success: true, user: { id: user.id, username: user.username } });
            });
        })(req, res);
    }
}

export { LoginController };