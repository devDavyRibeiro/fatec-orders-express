import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
export const authRouter = express.Router();

authRouter.post("/", (req : Request, res: Response)=>{
    const {username, passworld} = req.body;

    if(username ===  "admin" && passworld === "admin"){
        const token =jwt.sign({username:"admin"},"akjdhflkdsjgksndfsdg",)
        res.status(200).json({token});
        
    }
    res.status(401).send()
});