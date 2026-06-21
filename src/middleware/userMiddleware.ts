import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { envConfig } from "../config/config";

class UserMiddleware{
    async isUserLoggedIn(req:Request,res:Response,next:NextFunction):Promise<void>{
        // receive token 
       const token =  req.headers.authorization // manish
       if(!token){
        res.status(403).json({
            message : "Token must be provided"
        })
        return
       }
        // validate token 
       jwt.verify(token,envConfig.jwtSecretKey as string, async (err,result:any)=>{
        if(err){
            res.status(403).json({
                message : "Invalid token !!!"
            })
        }else{
            console.log(result)
            next()
        }
    })
    }
}
         
    
export default new UserMiddleware