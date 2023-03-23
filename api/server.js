const express = require ("express");
const cors = require("cors");
const UserModel=require("./user-model");
const {logger,
    checkSameUserName,
    isValidUser,
    validateNewUser}=require("./middleware")

const server = express();
server.use(express.json());
server.use(cors());
server.use(logger);


server.get("/api/users", (req,res)=>{
    res.json(UserModel.getAll());
})

server.post("/api/signup", checkSameUserName, validateNewUser, (req,res)=>{

    let user=req.user;
    let createdUser=UserModel.postUser(user);
    res.status(201).json(createdUser);
})

server.post("/api/login", isValidUser, (req,res)=>{
    res.status(201).json({message:"Hoş geldiniz " + req.body.userName})
})

server.use((err, req, res)=>{
    let status = err.status || 500;
    res.status(status).json({
        customMessage:"Bir hata var, serverdan yazıldı",
        message:err.message
    })
})

module.exports=server;