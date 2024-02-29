import { User } from "../models/user.js";


import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email}).select("+password");

  if(!user) return next(new ErrorHandler("Invalid Credentials", 400))

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch){
    return next(new ErrorHandler("Invalid Credentials", 404));
  }

  sendCookie(user, res, `Welcome back, ${user.name}`, 200);

}

export const register =  async (req,res)=>{
    const {name, email, password} = req.body;

    let user = await User.findOne({email});

    if(user) return next(new ErrorHandler("User already exists.", 400))

    const hashpassword = await bcrypt.hash(password,10);
    
    user = await User.create({
        name,
        email,
        password: hashpassword
    });

    sendCookie(user, res, "Registered Successfully", 201);

};

export const getMyProfile =  (req,res) => {
    // const {id} = req.query; [For static routing]
    // req.params for dynamic routing

    res.status(200).json({
        success: true,
        user: req.user,
    })   
};

export const logout =  (req,res) => {
    // const {id} = req.query; [For static routing]
    // req.params for dynamic routing

    res.status(200).cookie("token", "", {
        httpOnly: true,
        maxAge: 15*60*1000,
        // sameSite: process.env.NODE_ENV === "Development" ? "lex" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        user: req.user,
        // message: "Logout Successfully"
    })   
};
