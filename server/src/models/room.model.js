const mongoose= require("mongoose");

const roomSchema= new mongoose.Schema({
       userName:[{type:String,required:true}],
       roomName:{type:String,required:true}
},{
    versionKey:false,
    timestamps:true
})