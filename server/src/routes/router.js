
const express= require("express");
const router= express.Router();
const Room= require("../models/room.model");
const Chat= require("../models/chat.model")
const Message=require("../models/message.model")

router.get("/" , (req,res)=>{
    res.send("server is live now")
})

 // room routes start 
router.get("/rooms" , async (req,res)=>{
    try {
        const rooms= await Room.find().lean().exec();
        return res.status(200).send(rooms)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
    
})
router.post("/rooms" , async (req,res)=>{
    try {
        
        const room= await Room.create(req.body);
        return res.status(201).send(room)
    } catch (error) {
        console.log(error.message)
        res.status(400).send({message:error.message})
    }
    
})

// room routes end

// chat routes start 
router.get("/chats" , async (req,res)=>{
    try {
        const rooms= await Chat.find().lean().exec();
        return res.status(200).send(rooms)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
    
})
router.get("/chats/:name" , async (req,res)=>{
    try {
        const singleChat= await Chat.findOne({userName:req.params.name}).lean().exec();
        return res.status(200).send(singleChat)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
    
})
router.post("/chats" , async (req,res)=>{
    try {
        
        const isAllreadyUser= await Chat.find({userName:req.body.userName,roomName:req.body.roomName}).lean().exec();
        console.log(isAllreadyUser);
        if(isAllreadyUser.length){
            res.send({message:"user allready exist in the room"});
            return 
        }
        const room= await Chat.create(req.body);
       
        return res.status(201).send(room)
    } catch (error) {
        console.log(error.message)
        res.status(400).send({message:error.message})
    }
    
})



// chat routes end


// message route start 

router.get("/message" , async (req,res)=>{
    try {
        const messages= await Message.find().populate({path:"chat_id", select:["userName","roomName","user_id"]}).lean().exec();
        return res.status(200).send(messages)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
    
})
router.post("/message" , async (req,res)=>{
    try {
        
        const message= await Message.create(req.body);
        return res.status(201).send(message)
    } catch (error) {
        console.log(error.message)
        res.status(400).send({message:error.message})
    }
    
})

router.delete("/message" , async(req,res)=>{
    try {
        const message = await Message.remove();
        return res.status(200).send(message)
    } catch (error) {
        
    }
})

// message route ends

router.delete("/rooms" , async (req,res)=>{
    try {
        
        const room= await Room.deleteMany({});
        return res.status(201).send(room)
    } catch (error) {
        console.log(error.message)
        res.status(400).send({message:error.message})
    }
    
})
router.delete("/chats" , async (req,res)=>{
    try {
        
        const room= await Chat.deleteMany({});
        return res.status(201).send(room)
    } catch (error) {
        console.log(error.message)
        res.status(400).send({message:error.message})
    }
    
})



module.exports=router