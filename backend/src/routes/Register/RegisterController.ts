import { Request, Response } from "express";
import { CreateRegister } from "../../services/Register/CreateRegister";

interface RegisterBodyParams {
    username: string;
    email: string;
    password: string;
}

class RegisterController {
    async handle(req: Request, res: Response) {
        const { username, email, password }: RegisterBodyParams = req.body;

        if(this.verifications(username, email, password)) {
            const user = await CreateRegister.create(username, email, password);

            res.send("User successfuly created! " + username);

            return;
        }

        res.send("Error in create user");
    }

    verifications(username: string, email: string, password: string): boolean {
        if(username == undefined || username.length < 2) {
            return false;
        }
        else if(password == undefined || password.length < 4) {
            return false;
        }
        else if (email == undefined || email.length < 10) {
            return false
        }

        return true;
    }
}

export { RegisterController }