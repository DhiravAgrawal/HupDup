import fs from "fs";
import path from "path";
import {promisify} from "util";


const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

const revertRepo = async (commitID)=>{
    // console.log("revert command called..");
    const repoPath = path.resolve(process.cwd(), ".myGit");
    const commitsPath = path.resolve(repoPath, "commits");
    try{
        const commitDir = path.join(commitsPath, commitID);
        const files = await readdir(commitDir);
        const parentDir = path.resolve(repoPath, "..");

        for(const file of files){
            await copyFile(
                path.join(commitDir, file),
                path.join(parentDir, file),
            )
        }
        console.log(`Commit with ${commitID} reverted sucessfully`);
    }catch(err){
        console.log("error reverting ", err);
    }
}

export {revertRepo};