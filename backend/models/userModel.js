import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    repositories: [{
        type: Schema.Types.ObjectId,
        ref: "Repository",  // Corrected spelling here
        default: []
    }],
    followedUsers: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        default: []
    }],
    starRepos: [{
        type: Schema.Types.ObjectId,
        ref: "Repository",  // Corrected spelling here
        default: []
    }]
});

const User = mongoose.model("User", UserSchema);
export default User;
