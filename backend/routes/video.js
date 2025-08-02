import express from "express";
import { db } from "../index.js";
import fs from "fs";
import { __dirname } from "../index.js";
import axios from "axios"
import { redisClient, DEFAULT_EXPIRATION } from "../index.js";
import { error } from "console";


const streamroute = express.Router();



// streamroute.get("/media", (req, res) => {
//     const range = req.headers.range;
//     if (!range) {
//         res.status(400).json({ message: "Required range headers" });
//     }

//     console.log(__dirname)
//     const videoPath = `${__dirname}/public/neon.mp4`;
//     const videoSize = fs.statSync(`${__dirname}/public/neon.mp4`).size;

//     const chunk = 10 ** 6 //1mb
//     console.log(range)
//     const start = Number(range.replace(/\D/g, ""));
//     const end = Math.min(start + chunk, videoSize - 1);
//     const contentLength = end - start + 1;

//     const headers = {
//         "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//         "Accept-Range": "bytes",
//         "Content-Length": contentLength,
//         "Content-Type": "video/mp4"
//     };
//     res.writeHead(206, headers);

//     const videoStream = fs.createReadStream(videoPath, { start, end });
//     videoStream.pipe(res);
// })



streamroute.get("/movielist", async (req, res) => {
    const genres = ["Drama", "Sci-Fi", "Action", "Horror", "Romance"];
    console.log("movieList")
    try {
        const cached = await redisClient.get("genreList");
        if (cached) {
            return res.status(200).json(JSON.parse(cached));
        }

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
                    	'x-rapidapi-key': '67f8307922mshe000fe2905b314ep1b928djsnb3bcec0bd2d6',
			'x-rapidapi-host': 'netflix54.p.rapidapi.com'
		    }
                })
            )
        );

        const combinedResults = genres.map((genre, index) => ({
            genre,
            data: results[index].data
        }));

        const randomNumber = Math.floor(Math.random() * combinedResults.length);
        const randomTitle = Math.floor(Math.random() * combinedResults[randomNumber].data.titles.length);
        const randomMovie = combinedResults[randomNumber].data.titles[randomTitle].jawSummary;

        await redisClient.setEx("genreList", 3600, JSON.stringify({ combinedResults, randomMovie }));

        return res.status(200).json({ combinedResults, randomMovie });

    } catch (error) {
        console.error("Error in /movielist:", error);
        return res.status(500).json({ error: "Server error" });
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
        	'x-rapidapi-key': '67f8307922mshe000fe2905b314ep1b928djsnb3bcec0bd2d6',
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

streamroute.get("/similarTitles", async (req, res) => {
    const info = req.query.info;
    console.log(info)

    // const cached = await redisClient.get("similarTitles");
    // if (cached) {
    //     return res.status(200).json(JSON.parse(cached))
    // }

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
		'x-rapidapi-key': '67f8307922mshe000fe2905b314ep1b928djsnb3bcec0bd2d6',
		'x-rapidapi-host': 'netflix54.p.rapidapi.com'
	}

    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            // redisClient.setEx("similarTitles", DEFAULT_EXPIRATION, JSON.stringify(response.data))
            res.status(200).json(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    fetchData();
})


streamroute.get("/genre", async (req, res) => {
    const genre = req.query.genre;
    console.log(genre);

    const cached = await redisClient.get(genre)
    if (cached) {
        return res.status(200).json(JSON.parse(cached))
    }

    const options = {
        method: "GET",
        url: "https://netflix54.p.rapidapi.com/search/",
        params: {
            query: genre,
            offset: "0",
            limit_titles: "100",
            limit_suggestions: "20",
            lang: "en",
        },
        headers: {
		'x-rapidapi-key': '67f8307922mshe000fe2905b314ep1b928djsnb3bcec0bd2d6',
		'x-rapidapi-host': 'netflix54.p.rapidapi.com'
	}

    };

    async function fetchData() {


        try {

            const response = await axios.request(options);
            if (genre === "anime") {
                redisClient.setEx(genre, DEFAULT_EXPIRATION, JSON.stringify(response.data))
            }
            else if (genre === "movies") {
                redisClient.setEx(genre, DEFAULT_EXPIRATION, JSON.stringify(response.data))

            }
            else if (genre === "Tv shows") {
                redisClient.setEx(genre, DEFAULT_EXPIRATION, JSON.stringify(response.data))
            }
            res.status(200).json(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    fetchData();



})

// streamroute.get("/cinema", (req, res) => {
//     const options = {
//         method: "GET",
//         url: "https://netflix54.p.rapidapi.com/search/",
//         params: {
//             query: "movies",
//             offset: "0",
//             limit_titles: "100",
//             limit_suggestions: "20",
//             lang: "en",
//         },
//         headers: {
//             'x-rapidapi-key': '118ecc1808msh6f72e2dd3e06f4cp1803b1jsn1ca6d5a043db',
//             'x-rapidapi-host': 'netflix54.p.rapidapi.com'
//         }
//     };

//     async function fetchData() {
//         try {
//             const response = await axios.request(options);
//             res.status(200).json(response.data);

//         } catch (error) {
//             console.error(error);
//         }
//     }

//     fetchData();



// })



streamroute.post("/addmovie", async (req, res) => {
    console.log(req.body)
    const { id, logo, year, title, maturityDescription, specificRatingReason, tags, poster, cast, genres, rating, context, profileId } = (req.body);
    await db.query(`INSERT INTO mylist (movieId, logo, year, title, maturity_description, specific_rating_reason, tags, poster, casting, genres, rating, context, profile_id) 
        VALUES($1, $2, $3, $4, $5 ,$6, $7, $8, $9, $10, $11, $12, $13)`, [id, logo, year, title, maturityDescription, specificRatingReason, JSON.stringify(tags), poster, JSON.stringify(cast), JSON.stringify(genres), rating, context, profileId])
    res.status(200).json({ message: "added" })
})

streamroute.get("/mymovies", async (req, res) => {
    console.log(req.query.profileId)
    const profile_id = req.query.profileId;
    const response = await db.query("Select * from mylist where profile_id=$1", [profile_id]);
    console.log(response.rows[0])
    res.status(200).json(response.rows)
})


streamroute.delete("/removemovie", async (req, res) => {
    const { id, profileId } = req.body;
    console.log(id, profileId)
    await db.query("Delete from mylist where movieid=$1 AND profile_id=$2", [id, profileId])
    res.status(200).json("Deleted")
})
export { streamroute };
