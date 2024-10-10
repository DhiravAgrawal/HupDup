import express from "express";
import  {
    createRepository, 
    getAllRepositories, 
    fetchRepositoryById, 
    fetchRepositoryByName, 
    fetchRepositoryForCurrentUser, 
    updateRepositoryById, 
    toggleVisibilityById,
    deleteRepositoryById
} from "../controllers/repoController.js"

const repoRouter = express.Router();
repoRouter.post("/repo/createRepository",createRepository);
repoRouter.get("/repo/all",getAllRepositories);
repoRouter.get("/repo/:id",fetchRepositoryById);
repoRouter.get("/repo/name/:name",fetchRepositoryByName);
repoRouter.get("/repo/user/:userID",fetchRepositoryForCurrentUser);
repoRouter.put("/repo/update/:id",updateRepositoryById);
repoRouter.patch("/repo/toggle/:id",toggleVisibilityById);
repoRouter.delete("/repo/delete/:id",deleteRepositoryById);

export {repoRouter};


