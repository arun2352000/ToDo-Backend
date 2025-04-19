import express from "express";
import { signUp } from "../Controllers/user.Controllers.js";

const router=express.Router()

router.post('/signUp', signUp)

export default router;