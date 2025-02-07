import { QueryResult } from "pg";
import pool from "../../configs/database";
import RegisterData from "../../models/Register/RegisterData";
import { genSaltSync, hashSync } from "bcrypt";

class CreateRegister {
  static async create(username: string, email: string, password: string) {
    const salt = genSaltSync(10);
    const passwordHash = hashSync(password, salt);

    const user: QueryResult<RegisterData> = await pool.query(
      `insert into users(username, email, password) values ('${username}', '${email}', '${passwordHash}')`
    );

    return user.rows;
  }
}

export { CreateRegister };
