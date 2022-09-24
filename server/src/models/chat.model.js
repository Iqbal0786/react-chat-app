const mongoose= require("mongoose");

const chatSchema= new mongoose.Schema({
       user_id:{type:String,required:true},
       userName:{type:String,required:true},
       roomName:{type:String,required:true}
},{
    versionKey:false,
    timestamps:true
})

module.exports= mongoose.model("chats",chatSchema)