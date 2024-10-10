import mongoose from "mongoose";
import Repository from "../models/repoModel.js"
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";

const createIssue = async (req,res)=>{
    const { title, description} = req.body;
    const {id} = req.params.id;
    try {
        
        const newIssue = new Issue({
            title,
            description,
            repository:id,
        });

        await newIssue.save();
        res.status(201).json({ issue});
    } catch (err) {
        console.error("Error durinf creating issue:", err.message);
        res.status(500).send("Server Error");
    }
}
const updateIssueById = async (req,res)=>{
    const { title, description, status} = req.body;
    const {id} = req.params.id;
    try {
        const issue = await Issue.findById(id);
        if(!issue){
            res.send({message:"No issue found"})
        }
        issue.title = title;
        issue.description=description;
        issue.status=status;
        await issue.save();
        res.status(201).json({ issue});
    } catch (err) {
        console.error("Error durinf updating issue:", err.message);
        res.status(500).send("Server Error");
    }
}
const deleteIssueById = async (req,res)=>{
    const {id} = req.params.id;
    try {
        const issue = await Issue.findByIdAndDelete(id);
        if(!issue){
            res.send({message:"No issue found"})
        }
        res.json({message:"issue deleted"});
    } catch (err) {
        console.error("Error during deleting issue:", err.message);
        res.status(500).send("Server Error");
    }
}
const getAllIssues = async (req,res)=>{
    const {id} = req.params.id;
    try {
        const issues = await Issue.find({}).toArray();
        if(!issues){
            res.send({message:"No issue found"})
        }
        res.json(issues);
    } catch (err) {
        console.error("Error durinf fethcing issue:", err.message);
        res.status(500).send("Server Error");
    }
}
const getIssueById = async (req,res)=>{
    const {id} = req.params.id;
    try {
        const issue = await Issue.findById(id);
        if(!issue){
            res.send({message:"No issue found"})
        }
        res.json(issue);
    } catch (err) {
        console.error("Error during fetching issue:", err.message);
        res.status(500).send("Server Error");
    }
}
export {createIssue, updateIssueById, deleteIssueById, getAllIssues, getIssueById}