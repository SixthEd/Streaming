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


const cors = (req, res, next) => {
    res.header("Access-Control-Allow-Headers" , "Content-Type");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true")
    //
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    if (req.method.toLowerCase() === "options") return res.sendStatus(204);
    next();
}


const db = new pg.Client({
 user: "postgres",
 host: "localhost",
 database: "netflix",
 password: "1234",
    port: "5432"
})

db.connect();
app.use(cors);

app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", router);
app.use("/",windroute);

app.listen(port,()=>{
console.log(`Server is running on ${port}`);
})

export {db, env};
