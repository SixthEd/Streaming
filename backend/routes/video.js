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



streamroute.get("/movielist", (req, res) => {
    const info = req.query.info;
    const movieList ={};
    const options = {
        method: 'GET',
        url: 'https://netflix54.p.rapidapi.com/search/',
        params: {
            query: info,
            offset: '0',
            limit_titles: '50',
            limit_suggestions: '20',
            lang: 'en'
        },
      headers: {
		'x-rapidapi-key': 'd63db78f9amshc2d7d4e90be5377p129b18jsnb10ca9a0a0e6',
		'x-rapidapi-host': 'netflix54.p.rapidapi.com'
	}

    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            res.status(200).json(response.data)
        } catch (error) {
            console.error(error);
        }
    }
    fetchData()
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
		'x-rapidapi-key': 'f53a9072eamsh72ed226693e68a0p12185bjsn055b60771f76',
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
		'x-rapidapi-key': 'd63db78f9amshc2d7d4e90be5377p129b18jsnb10ca9a0a0e6',
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