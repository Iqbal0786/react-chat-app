
const express= require("express");
const router= express.Router();

router.get("/" , (req,res)=>{
    res.send("server is live now")
})




module.exports=router