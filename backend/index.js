import express from "express";
import { router } from "./routes/user.js";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
import cookieParser from "cookie-parser";
import { windroute } from "./routes/windows.js";
import { streamroute } from "./routes/video.js";
import { dirname, join } from "path";
import Redis from "redis";
import { fileURLToPath } from "url";
import path from "path"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_EXPIRATION = 3600;

const port = 4000;

const redisClient = Redis.createClient({
   url: 'redis://redis:6379'

 });

redisClient.on('error', (err) => console.error('Redis error:', err));

 await redisClient.connect();

const app = express();

env.config();


const cors = (req, res, next) => {
    res.header("Access-Control-Allow-Headers", "*");
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true")
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	res.header("Access-Control-Allow-Origin", "http://ec2-65-0-167-220.ap-south-1.compute.amazonaws.com:80");

    if (req.method.toLowerCase() === "options") {
	    return res.sendStatus(204);
    }

    next();
}


const db = new pg.Client({
    user: "postgres",
    host: "db",
    database: "postgres",
    password: "postgres",
    port: "5432"
})

db.connect();
app.use(cors);

app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'../frontend/build')))

app.get("/", (req, res) => { res.json({ "henlo": "henlo" }); })

app.use("/", router);
app.use("/", windroute);
app.use("/", streamroute);

app.get('*thing', (req, res) => {
    res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})

export { db, env, __dirname, DEFAULT_EXPIRATION, redisClient };
