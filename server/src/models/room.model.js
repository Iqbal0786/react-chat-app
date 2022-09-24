const mongoose= require("mongoose");

const roomSchema= new mongoose.Schema({
       roomName:{type:String,required:true}
},{
    versionKey:false,
    timestamps:true
})

module.exports= mongoose.model("rooms",roomSchema)