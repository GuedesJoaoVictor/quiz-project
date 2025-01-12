import e, { Express } from "express";
import Routes from "./src/routes";
import pool from "./src/configs/database";

(async () => {
    try {
        const client = await pool.connect();
        console.log("Connected to database");
        client.release();
    } catch (error) {
        console.log("Error in connect to database: " + error);
    }
})();

const PORT = 8080;

const app: Express = e();
app.use(e.json());

const router = new Routes(app);

app.use(router.routes);


app.listen(PORT, () => {
    console.log(`Server is initialized on port: http://localhost:${PORT}`)
})