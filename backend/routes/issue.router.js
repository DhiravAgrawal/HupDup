import express from "express";
const issueRoute = express.Router();
import {createIssue, updateIssueById, deleteIssueById, getAllIssues, getIssueById} from "../controllers/issueController.js"

issueRoute.post("/issue/create",createIssue);
issueRoute.put("/issue/update/:id",updateIssueById);
issueRoute.delete("/issue/delete/:id",deleteIssueById);
issueRoute.get("/issue/all",getAllIssues);
issueRoute.get("/issue/:id",getIssueById);

export {issueRoute};