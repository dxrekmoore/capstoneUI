/*This file is used send the user registration information to the server */
import express from "express";
const router = express.Router();

import { signin, signup } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);

export default router;