import { promises as fs } from "fs";
import path from "path";
import {s3, S3_BUCKET} from "../config/aws-config.js";

const pullRepo = async ()=>{
    // console.log("pull command called..");
    const repoPath = path.resolve(process.cwd(), ".myGit");
    const commitsPath = path.join(repoPath, "commits"); 

    try{
        // const commitID = uuidv4();   
        const data = await s3.listObjectsV2({
            Bucket:S3_BUCKET,
            Prefix:"commits/",
        })
        .promise();

        const objects = data.Contents;
        for(const object of objects){
            const key = object.Key;
            const commitDir = path.join(
                commitsPath,
                path.dirname(key).split("/").pop()
            )
            await fs.mkdir(commitDir, {recursive : true});
            const params = {
                Bucket:S3_BUCKET,
                Key: key,
            }
            const fileContent = await s3.getObject(params).promise();
            await fs.writeFile(path.join(repoPath, key), fileContent.Body);
            console.log("All commits pulled from s3");
        }
        
    }catch(err){
        console.error("Unable to pull ", err);
    }
}

export {pullRepo};