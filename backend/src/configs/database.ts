import { Pool } from "pg";
import { DataBaseEnv } from "./databaseEnv";

const dbenv = new DataBaseEnv();

const pool = new Pool({
    user: dbenv.user,
    password: dbenv.password,
    host: dbenv.host,
    port: dbenv.port,
    database: dbenv.databaseName
});


export default pool;