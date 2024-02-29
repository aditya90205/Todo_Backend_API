import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req,res,next) => {

    const {token} = req.cookies;
    // console.log(token);

    if(!token){
        return res.status(400).json({
            success: false,
            message: "Login First"
        })
    }

    const decodedId = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedId);

    next();
}