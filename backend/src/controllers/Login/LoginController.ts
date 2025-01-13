import {Request, Response} from "express";
import pool from "../../configs/database";
import {QueryResult} from "pg";
import LoginResponseData from "../../models/Login/LoginResponseData";
import {compareSync} from "bcrypt";

class LoginController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        if(this.verifications(email, password)) {
            const dataUser:QueryResult<LoginResponseData> = await pool.query(`select * from users where email = '${email}'`);

            if(dataUser.rows.length == 0) {
                res.json("User don't exists.");
                return;
            }

            const message = this.userLoginMessage(dataUser.rows.at(0), email, password)

            res.json(message);
            return;
        }
        res.json("Login failed.");
    }

    verifications(email: string, password: string): boolean {
        if(email == undefined || email.length < 10) {
            return false;
        }
        if(password == undefined || password.length < 2) {
            return false;
        }
        return true;
    }

    userLoginMessage(dataUser: LoginResponseData | undefined, email: string, password: string): string {
        if(dataUser == undefined) {
            return "User not exists";
        }
        else if(dataUser.email != email) {
            return "Email dont exits";
        }
        else if(!compareSync(password, dataUser.password)) { // Se a senha for diferente da que está armazenada no banco
            return "Password is incorrect";
        }

        return "Successful login!";
    }
}

export { LoginController };