
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        // const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc4M2NmYmUyMzljNjAyMjQyYzQzNDAiLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmVkYW50X3NvbmFyXyIsImZ1bGxuYW1lIjoiVmVkYW50IFNvbmFyIiwiaWF0IjoxNzIwNTkyODgxLCJleHAiOjE3MjA2NzkyODF9.497Cfgqt4eg5OR0JWoaQZIngpRQqKcSV7skBDKXTjkQ"
        
        // console.log(token);
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request-a");
        }
        
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})
