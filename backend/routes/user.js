import express from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import {db } from "../index.js";
import jwt from "jsonwebtoken";


const router = express.Router();

const saltRound = 10;

//register
router.post("/register", async (req,res)=>{
    const {name , email , password , confirmPassword} = req.body;
    console.log(name , email , password , confirmPassword );
    const response = await db.query("Select * from accounts where email=$1",[email]);
    if(response.rows.length>0)
    {
        res.status(400).json({message : "User is already exist"});
    }
    else
    {
        if(!name || !email || !password || !confirmPassword)
        {
            return res.status(400).json({message: "All fields are required"})
        }

        if(!validator.isStrongPassword(password))
        {
            return res.status(400).json({message: "Password should be strong"});
        }

        if(!validator.isEmail(email))
        {
            return res.status(400).json({message: "Please Enter valid email"});
        }

        if(password!==confirmPassword)
        {
            return res.status(400).json({message: "Password and Confirm Password are not same"});
        }
        bcrypt.hash(password, saltRound, async (err , hash)=>{
            if(err)
            {
                return res.status(400).json({message : "error in hashing the password"});
            }
            else
            {
                await db.query("Insert into accounts (user_name, email ,password_hash) values($1,$2,$3)",[name,email,hash]);
                const response = await db.query("select account_id from accounts where email=$1",[email]);
                const account_id=  response.rows[0].account_id;
                return res.status(200).json({account_id,name,email});
            }
        })


    }
})


router.post("/login", async (req, res)=>{
    const {email, password} = req.body;
    console.log(email, password)
    const response = await db.query("select * from accounts where email=$1",[email]);
    if(response.rows.length>0)
    {
        const password_hash = response.rows[0].password_hash;
        const {account_id, user_name } = response.rows[0];
        bcrypt.compare(password, password_hash, (err, valid)=>{
            if(err)
            {
                res.status(400).json({message : err.message})
            }
            else if(valid)
            {
                const refreshToken = jwt.sign({account_id, user_name, email, exp: Math.floor(Date.now()/1000) + (60)}, process.env.REFRESH_TOKEN_SECRET);
                const accessToken = jwt.sign({account_id, user_name, email , exp: Math.floor(Date.now()/1000) + (30)}, process.env.ACCESS_TOKEN_SECRET);
                res.cookie("jwt",{account_id, user_name, email,refreshToken, accessToken}, {expires: new Date(Date.now() +1000 * 60 * 60), httpOnly:true, secure:false, overwrite: true});
                res.status(200).json({account_id, user_name, email});
            }
            else
            {
                res.status(400).json({message: "Email or Password is incorrect"});
            }
        })
    }
    else
    {
        res.status(400).json({message : "User is not exist"});
    }

})

router.get("/verify", verifyRefreshToken,(req, res, next)=>{
    res.status(200);
})

function verifyRefreshToken(req, res, next){
    const {accessToken, refreshToken} = req.cookies.jwt;
    console.log("old",accessToken);
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decode)=>{
        if(err instanceof jwt.TokenExpiredError)
        {
            const newAccessToken = generateToken(refreshToken);
            if(newAccessToken)
            {
                res.cookie("jwt",{newAccessToken, refreshToken}, {expires: new Date(Date.now() + 1000 * 60 * 60), httpOnly: true, secure: false, overwrite: true});
            }
            console.log("new",newAccessToken)
        }
        else if(err)
        {
            res.clearCookie();
        }
    })
    next();
}

const generateToken = (refreshToken)=>{
    try
    {
        const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const email = decode.email;
        const account_id = decode.account_id;
        const user_name =decode.user_name;
        const accessToken=jwt.sign({email, account_id , user_name, exp: Math.floor(Date.now()/1000) + 30} , process.env.ACCESS_TOKEN_SECRET);
        return accessToken;
    }
    catch(err)
    {
        return; 
    }
}




export {router};
