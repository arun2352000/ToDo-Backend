import express from "express";
import { signIn, signUp } from "../Controllers/user.Controllers.js";

const router=express.Router()

router.post('/signUp', signUp)
router.get('/signIn',signIn)

export default router;