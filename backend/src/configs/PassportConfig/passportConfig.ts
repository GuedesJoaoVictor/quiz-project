import passport from "passport";
import { Strategy } from "passport-local";
import pool from "../database";
import { QueryResult } from "pg";
import LoginResponseData from "../../models/Login/LoginResponseData";
import bcrypt from "bcrypt";

passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const result: QueryResult<LoginResponseData> = await pool.query(
          `select * from users where email = '${email}'`
        );
        const user = result.rows[0];

        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Password is incorrect" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const result: QueryResult<LoginResponseData> = await pool.query(
      `select * from users where id = ${id}`
    );
    const user = result.rows[0];
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
