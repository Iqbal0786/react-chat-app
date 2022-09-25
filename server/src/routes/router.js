
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
router.post("/rooms" , async (req,res)=>{
    try {
        
        const room= await Room.create(req.body);
        return res.status(201).send(room)
    } catch (error) {
        console.log(error.message)
        res.status(400).send({message:error.message})
    }
    
})

// router.delete("/rooms" , async (req,res)=>{
//     try {
        
//         const room= await Room.remove({});
//         return res.status(201).send(room)
//     } catch (error) {
//         console.log(error.message)
//         res.status(400).send({message:error.message})
//     }
    
// })



module.exports=router