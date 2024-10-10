import express from "express";
import {userRouter} from "./user.router.js";
import { repoRouter } from "./repo.router.js";
import { issueRoute } from "./issue.router.js";
const mainRouter = express.Router();
mainRouter.use(userRouter);
mainRouter.use(repoRouter);
mainRouter.use(issueRoute);
mainRouter.get("/",(req,res)=>{
    res.send("Welcome!");
})

export {mainRouter};