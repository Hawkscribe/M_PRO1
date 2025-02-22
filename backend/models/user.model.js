import mongoose from "mongoose";

const userSchema=new mongoose.SchemaTypes({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    eMail:{type:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    followers:[{
        type:mongoose.SchemaTypes.Types.ObjectId,
        ref:"User",
        default:[]
    }],
    profileImg:{
        type:String,
        default:"",    
    },
    coverImg:{
        tyype:String,
        default:"",
    },
    bio:{
        type:String,
        default:"",
    },
    link:{
        type:String,
        default:"",
    }

},{timestamp:true})


const user=mongoose.model("user",userSchema);

export default user;