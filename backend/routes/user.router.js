import express from "express";
import  {getAllUsers, signUp, login, getUserProfile, updateUserProfile, deleteUserProfile} from "../controllers/userController.js"


const userRouter = express.Router();
userRouter.get("/AllUsers",getAllUsers);
userRouter.post("/signup",signUp);
userRouter.post("/login",login);
userRouter.get("/userProfile/:id",getUserProfile);
userRouter.put("/updateUserProfile/:id",updateUserProfile);
userRouter.delete("/deleteUserProfile/:id",deleteUserProfile);

export {userRouter};


