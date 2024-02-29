import express from "express";
import {getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.get("/", (req,res) => {
    res.send("Working");
})


router.get("/api/v1/userId/me", isAuthenticated, getMyProfile);

router.post("/api/v1/users/new", register);
router.post("/api/v1/users/login", login);
router.get("/api/v1/users/logout", logout);

export default router;