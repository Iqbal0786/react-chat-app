const mongoose=require("mongoose");

const messageSchema= new mongoose.Schema({
     body:{type:String,required:true},
     chat_id:{type:mongoose.Schema.Types.ObjectId , ref:"chats"}
},{
    versionKey:false,
    timestamps:true
})

module.exports= mongoose.model("message",messageSchema)