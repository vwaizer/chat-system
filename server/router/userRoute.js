import express from "express";

export const userRoutes=express.Router();

userRoutes.get("/me",(req,res)=>{return res.json("me")
})	