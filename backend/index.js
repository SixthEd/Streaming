import express from "express";
import {router} from "./routes/user.js";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
import cookieParser from "cookie-parser";
import { windroute } from "./routes/windows.js";

const port = 4000;
const app = express();

env.config();

const db = new pg.Client({
 user: "postgres",
 host: "localhost",
 database: "netflix",
 password: "1234",
    port: "5432"
})

db.connect();

app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", router);
app.use("/",windroute)

app.listen(port,()=>{
console.log(`Server is running on ${port}`);
})

export {db, env};
