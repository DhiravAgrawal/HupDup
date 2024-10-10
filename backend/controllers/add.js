import { promises as fs } from "fs";
import path from "path";

const addRepo = async (filePath)=>{
    // console.log("add command called..");
    const repoPath = path.resolve(process.cwd(),".myGit");
    const stagingPath = path.join(repoPath, "staging");

    try{
        await fs.mkdir(stagingPath, {recusive : true});
        const fileName = path.basename(filePath);
        await fs.copyFile(filePath, path.join(stagingPath, fileName));
        console.log(`file ${fileName} added to staging area!`)
    }catch(err){
        console.error("error adding staging",err);
    }
}

export {addRepo};