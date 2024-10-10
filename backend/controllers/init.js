import { promises as fs } from "fs";
import path from "path";
import { exec } from 'child_process';

const initRepo = async ()=>{
    // console.log("init command called..");
    const repoPath = path.resolve(process.cwd(), ".myGit");
    const commitsPath = path.join(repoPath, "commits");

    try{
        await fs.mkdir(repoPath, {recursive : true});
        if (process.platform === 'win32') {
            // On Windows, mark the folder as hidden
            exec(`attrib +h ${repoPath}`, (err) => {
                if (err) {
                    console.error('Error hiding folder on Windows:', err);
                } else {
                    console.log('Folder marked as hidden on Windows.');
                }
            });
        }
        await fs.mkdir(commitsPath, {recursive : true});
        await fs.writeFile(
            path.join(repoPath, "cofig.json"),
            JSON.stringify({ bucket : process.env.S3_BUCKET})
        );
        console.log("repository initialize  ")
    }catch(err){
        console.error("Error initializing repository",err)
    }
}

export {initRepo};