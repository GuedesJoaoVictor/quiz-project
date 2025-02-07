import { Request, Response } from "express";
import { CreateRegister } from "../../services/Register/CreateRegister";
import pool from "../../configs/database";
import { QueryResult } from "pg";
import RegisterData from "../../models/Register/RegisterData";

interface RegisterBodyParams {
  username: string;
  email: string;
  password: string;
}

class RegisterController {
  async handle(req: Request, res: Response) {
    const { username, email, password }: RegisterBodyParams = req.body;

    const userExists: QueryResult<RegisterData> = await pool.query(
      `select * from users where email = '${email}'`
    );

    if (this.verifications(username, email, password, userExists.rowCount)) {
      const user = await CreateRegister.create(username, email, password);

      res.send("User successfuly created! " + username);
      return;
    }

    res.send("Error in create user");
  }

  verifications(
    username: string,
    email: string,
    password: string,
    rowCount: number | null
  ): boolean {
    if (username == undefined || username.length < 2) {
      return false;
    } else if (password == undefined || password.length < 4) {
      return false;
    } else if (email == undefined || email.length < 10) {
      return false;
    } else if (rowCount == null || rowCount >= 1) {
      return false;
    }
    return true;
  }
}

export { RegisterController };
