import mongoose from "mongoose";
import Repository from "../models/repoModel.js"
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";
import 'dotenv/config';

const createRepository = async (req,res)=>{
    const {owner, name, issues, content, description,visibility} = req.body;
    try{
        if(!name){
            res.status(400).json({error:"Repository name is required"})
        }
        if(!mongoose.Types.ObjectId.isValid(owner)){
            res.status(400).json({error:"Invalid user id"})
        }   

        const newRepo = new Repository({
            owner,
            name,
            issues,
            content,
            description,
            visibility
        });
        const result = await newRepo.save();

        res.status(201).send({
            message:"Repository Created",
            respositoryID: result._id,
        })
    }catch(err){
        console.error("error during creating repository :", err.message);
        res.status(500).send("Server Error");
    }
}
const getAllRepositories = async (req,res)=>{
    try{
        const repositories = await Repository.find({})
        .populate("owner")
        .populate("issues");
        if(!repositories){
            res.send({message:"No repositories found"})
        }
        res.json(repositories);
    }catch(err){
        console.error("error during fetching repositories :", err.message);
        res.status(500).send("Server Error");
    }
}
const fetchRepositoryById = async (req,res)=>{
    const {repoId} = req.params.id;
    try{
        const repository = await Repository.findOne({_id : repoId})
        .populate("owner")
        .populate("issues")

        if(!repository){
            res.send({message:"No repository found"})
        }
        res.json(repository);
    }catch(err){
        console.error("error during fetching repository :", err.message);
        res.status(500).send("Server Error");
    }
}
const fetchRepositoryByName = async (req, res) => {
    const { repoName } = req.params.name;
    try {
        const repository = await Repository.findOne({ name: repoName })
            .populate("owner")
            .populate("issues");

        if (!repository) {
            return res.send({ message: "No repository found" });
        }

        return res.json(repository);
    } catch (err) {
        console.error("error during fetching repository:", err.message);
        return res.status(500).send("Server Error");
    }
};
const fetchRepositoryForCurrentUser = async (req, res) => {
    const { userID } = req.params.userID;
    try {
        const repositories = await Repository.find({ owner: userID }) // Changed findOne to find to return all repos for user
            .populate("owner")
            .populate("issues");

        if (!repositories || repositories.length === 0) { // Added length check
            return res.send({ message: "No repository found" });
        }

        return res.json(repositories);
    } catch (err) {
        console.error("error during fetching repository:", err.message);
        return res.status(500).send("Server Error");
    }
};
const updateRepositoryById = async (req,res)=>{
    const {id} = req.params.id;
    const {content, description} = req.body;
    
    try{

        const repository = await Repository.findById(id);
        if(!repository){
            res.send({message:"No repository found"})
        }
        repository.content.push(content);
        repository.description=description;
        res.json(repository);
    }catch(err){
        console.error("error during updating repository :", err.message);
        res.status(500).send("Server Error");
    }
}
const toggleVisibilityById = async (req,res)=>{
    const {id} = req.params.id;
    try{

        const repository = await Repository.findById(id);
        if(!repository){
            res.send({message:"No repository found"})
        }

        repository.visibility=!repository.visibility;
        res.json(repository);
    }catch(err){
        console.error("error during updating repository :", err.message);
        res.status(500).send("Server Error");
    }
}
const deleteRepositoryById = async (req,res)=>{
    const {id} = req.params.id;
    try{
        const repository = await Repository.findByIdAndDelete(id);
        if(repository){
            res.send({message:"No repository found"})
        }
        res.json({message:"repository deleted"});
    }catch(err){
        console.error("error during updating repository :", err.message);
        res.status(500).send("Server Error");
    }
}

export {createRepository, getAllRepositories, fetchRepositoryById, fetchRepositoryByName, fetchRepositoryForCurrentUser, updateRepositoryById, toggleVisibilityById, deleteRepositoryById};