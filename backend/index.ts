import e, { Express } from "express";
import Routes from "./src/routes";
import pool from "./src/configs/database";
import { DataBaseEnv } from "./src/configs/databaseEnv";
import session from "express-session";
import passport from "./src/configs/PassportConfig/passportConfig";
import cors from "cors";

(async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to database");
    client.release();
  } catch (error) {
    console.log("Error in connect to database: " + error);
  }
})();

const PORT = 8000;
const env = new DataBaseEnv();

const app: Express = e();
app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret: env.password,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
const router = new Routes();

app.use(router.routes);

app.listen(PORT, () => {
  console.log(`Server is initialized on port: http://localhost:${PORT}`);
});
