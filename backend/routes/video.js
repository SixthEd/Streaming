import express from "express";
import { db } from "../index.js";
import fs from "fs";
import { __dirname } from "../index.js";

const streamroute = express.Router();



streamroute.get("/media", (req, res)=>{
    const range = req.headers.range;
    if(!range)
    {
        res.status(400).json({message:"Required range headers"});
    }

    console.log(__dirname)
    const videoPath =`${__dirname}/public/neon.mp4`;
    const videoSize =fs.statSync(`${__dirname}/public/neon.mp4`).size;

    const chunk = 10**6 //1mb
    console.log(range)
    const start = Number(range.replace(/\D/g,""));
    const end = Math.min(start + chunk, videoSize-1);
    const contentLength = end -start +1;

    const headers = {
        "Content-Range" :`bytes ${start}-${end}/${videoSize}`,
        "Accept-Range": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    };
    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, {start, end});
    videoStream.pipe(res);
})

export {streamroute};