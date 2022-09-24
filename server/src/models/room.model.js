const mongoose= require("mongoose");

const roomSchema= new mongoose.Schema({
       user_id:{type:String,required:true},
       userName:{type:String,required:true},
       roomName:{type:String,required:true}
},{
    versionKey:false,
    timestamps:true
})

module.exports= mongoose.model("rooms",roomSchema)