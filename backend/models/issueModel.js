import mongoose from "mongoose";
import { Schema  } from "mongoose";


const IssueSchema = new Schema({
    title: {
        type: String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["open","closed"],
        default:"open",
    },
    repository:{
        type:Schema.Types.ObjectId,
        ref:"Respository",
        required:true,
    },
})

const Issue = mongoose.model("Issue", IssueSchema);
export default Issue;   