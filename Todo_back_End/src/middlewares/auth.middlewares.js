import { User } from "../models/users.models.js";
import { apiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from 'jsonwebtoken'

export const jwtVerity= asyncHandler(async(req,res,next)=>{

    try {
        const token=req?.cookies?.accessToken||req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            throw new apiError(404,"Token Not found")
        }
        const decoded=  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user= await User.findById(decoded?._id).select("-password 'refreshToken")
        if (!user) {
            throw new apiError(404,"User Not found")
        }
        req.user=user;
        next();
    } catch (error) {
        throw new apiError(404,error?error.message:"Not Authenticated");
    }
})