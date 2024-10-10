import 'dotenv/config';
import yargs from "yargs";
import cors from "cors";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import http from "http";
import express from "express";
import {Server} from "socket.io";
import { mainRouter } from './routes/main.router.js';
import {connectToMongoDB} from "./connection.js";
import {hideBin} from 'yargs/helpers';
import {initRepo} from "./controllers/init.js";
import {addRepo} from "./controllers/add.js";
import {commitRepo} from "./controllers/commit.js";
import {pushRepo} from "./controllers/push.js";
import {pullRepo} from "./controllers/pull.js";
import {revertRepo} from "./controllers/revert.js";

yargs(hideBin(process.argv))
    .command('start',"Starts a new server", {}, startServer)
    .command('init',"Initialize new repository",{}, initRepo)
    .command('add <file>',"add  a file to repository",(yargs)=>{
        yargs.positional("file",{
            describe:"File to add to the staging area",
            type:"String"
        })
    }, (argv)=>{addRepo(argv.file)})
    .command('commit <message>',"commiting the staged files",(yargs)=>{
        yargs.positional("message",{
            describe:"Commit message",
            type:"String"
        })
    },(argv)=>{commitRepo(argv.message)})
    .command('push',"Push commits to S3",{}, pushRepo)
    .command('pull',"Pull commits from S3",{}, pullRepo)
    .command('revert <commitID>',"Revert to specific commit",(yargs)=>{
        yargs.positional("commitID",{
            describe:"Commit ID to revert to",
            type:"String"
        })
    }, (argv)=>{revertRepo(argv.commitID)})
    .demandCommand(1, "You need atleast one command")
    .help().argv;


function startServer(){
    // console.log("...");
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(bodyparser.json());
    app.use(express.json());

    const dbUrl = process.env.ATLASDB_URL;
    connectToMongoDB(dbUrl)
        .then((result) => {
            console.log("DB connected")
        }).catch((err) => {
            console.log("DB not connected", err)
        });
    app.use(cors({origin : "*"}));
    app.use(mainRouter);

    const user = "test";
    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
        cors:{
            methods:["GET", "POST"]
        }
    });
    io.on("connection", (Socket)=>{
        Socket.on("joinRoom",(userID)=>{
            user = userID;
            console.log("=====");
            console.log(user);
            console.log("=====");
            Socket.join(userID);    
        })
    })

    const db = mongoose.connection;
    db.once("open", async()=>{
        console.log("CRUD operation called");
        //CRUD operation 
    })

    httpServer.listen(port, ()=>{
        console.log("Server is running")
    })
}