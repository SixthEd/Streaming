import express from "express";
import {db} from "../index.js";

const windroute= express.Router();

windroute.get("/showManageProfile", async (req, res)=>{
    const {email} = req.body.email;
    const response = await db.query("select profile_id from user_profiles up JOIN accounts a ON up.account_id = a.account_id where a.email =$1",[email]);
    console.log(response.rows)
    res.status(200).json({profiles_id: response.rows});
})

windroute.post("/showManageProfile/add", async (req, res)=>{
    const {email, name , avatar_url, is_kid} = req.body;
    const response = await db.query("select account_id from accounts where email=$1",[email]);
    const account_id = response.rows[0].account_id;
    const response1 = await db.query("select profile_id FROM user_profiles WHERE account_id = $1",[account_id]);
    console.log(response1.rows.length)
    if(response1.rows.length>=0 && response1.rows.length<4)
    {
        await db.query("insert into user_profiles (account_id, name, is_kid, avatar_url) VALUES($1,$2,$3,$4)",[account_id, name, is_kid, avatar_url]);
        return res.status(200).json({message: "added"});
    }
    else
    {
        res.status(400).json({message: "Limit is exceed"})
    }
})

windroute.delete("/showManageProfile/delete", async (req, res)=>{
    const profile_id = req.body.profile_id;
    await db.query("delete from user_profiles where profile_id=$1",[profile_id]);
    res.status(200).json({nessage: "deleted"})
})

windroute.put("/showManageProfile/update", async (req, res)=>{
    const {name, avatar_url, profile_id} = req.body;
    await db.query("update user_profiles set name=$1 , avatar_url=$2 where profile_id=$3",[name, avatar_url, profile_id]);
    res.status(200).json({message: "updated"})
})

export {windroute};
