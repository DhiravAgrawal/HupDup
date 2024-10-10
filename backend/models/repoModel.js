    import mongoose from "mongoose";
    import { Schema  } from "mongoose";


    const RepositorySchema = new Schema({
        name: {
            type: String,
            required:true,
            unique:true
        },
        description:{
            type:String,
        },
        content:[
            {
                type:String
            }
        ],
        visibility:{
            type:Boolean
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        issues:[
            {
                type:Schema.Types.ObjectId,
                ref:"Issue"
            }
        ]
    })

    const Respository = mongoose.model("Repository", RepositorySchema);
    export default Respository;   