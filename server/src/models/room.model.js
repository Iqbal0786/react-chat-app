const mongoose= require("mongoose");

const roomSchema= new mongoose.Schema({
       roomTitle:{type:String,required:true}
},{
    versionKey:false,
    timestamps:true
})

module.exports= mongoose.model("room",roomSchema)