
const express= require("express");
const router= express.Router();
const Room= require("../models/room.model")

router.get("/" , (req,res)=>{
    res.send("server is live now")
})


router.get("/rooms" , async (req,res)=>{
    try {
        const rooms= await Room.find().lean().exec();
        return res.status(200).send(rooms)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
    
})



module.exports=router