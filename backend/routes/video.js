import express from "express";
import { db } from "../index.js";
import fs from "fs";
import { __dirname } from "../index.js";
import axios from "axios"
const streamroute = express.Router();



streamroute.get("/media", (req, res) => {
    const range = req.headers.range;
    if (!range) {
        res.status(400).json({ message: "Required range headers" });
    }

    console.log(__dirname)
    const videoPath = `${__dirname}/public/neon.mp4`;
    const videoSize = fs.statSync(`${__dirname}/public/neon.mp4`).size;

    const chunk = 10 ** 6 //1mb
    console.log(range)
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunk, videoSize - 1);
    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Range": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    };
    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
})



streamroute.get("/movielist", async (req, res) => {
    const genres = ["Drama", "Sci-Fi", "Action", "Horror", "Romance"];

    try {
        const results = await Promise.all(
            genres.map((genre) =>
                axios.request({
                    method: "GET",
                    url: "https://netflix54.p.rapidapi.com/search/",
                    params: {
                        query: genre,
                        offset: "0",
                        limit_titles: "50",
                        limit_suggestions: "20",
                        lang: "en",
                    },
                    headers: {
                        'x-rapidapi-key': '841df02299msh2eb9efa70e5cf7fp1be903jsncb33d9e2e96b',
                        'x-rapidapi-host': 'netflix54.p.rapidapi.com'
                    }
                })
            )
        );

        // Merge or process results
        const combinedResults = genres.map((genre, index) => ({
            genre,
            data: results[index].data
        }));
        res.status(200).json(combinedResults); // ✅ send only one response
    } catch (error) {
        console.error("Error fetching movie list:", error);
        res.status(500).json({ error: "Failed to fetch movie list" }); // ✅ send only one error response
    }
})

streamroute.get("/movieTrailer", (req, res) => {
    const info = req.query.info;
    console.log(info)
    const options = {
        method: 'GET',
        url: 'https://netflix133.p.rapidapi.com/trailer',
        params: {
            contentId: info
        },
        headers: {
            'x-rapidapi-key': '841df02299msh2eb9efa70e5cf7fp1be903jsncb33d9e2e96b',
            'x-rapidapi-host': 'netflix133.p.rapidapi.com'
        }
    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            res.status(200).json(response.data);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    fetchData();
    // res.json(req.query.info)
})

streamroute.get("/similarTitles", (req, res) => {
    const info = req.query.info;
    console.log(info)

    const options = {
        method: 'GET',
        url: 'https://netflix54.p.rapidapi.com/title/similars/',
        params: {
            id: info,
            offset: '0',
            limit: '18',
            lang: 'en'
        },
        headers: {
            'x-rapidapi-key': '841df02299msh2eb9efa70e5cf7fp1be903jsncb33d9e2e96b',
            'x-rapidapi-host': 'netflix54.p.rapidapi.com'
        }


    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            res.status(200).json(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    fetchData();
})

export { streamroute };