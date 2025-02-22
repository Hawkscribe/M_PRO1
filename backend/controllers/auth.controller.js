import bcrypt from 'bcrypt.js';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
const JWT_SECRET="mummaislife"
const generateT = (user_id, res) => {
const token=jwt.sign({user_id},JWT_SECRET,{
    expiresIn:'15d'
})
res.cookie("jwt",token,{
    maxAge:15*24*60*60*1000,
     
})
};



export const signup=async (req,res)=>{
   
try {
    const {fullname,username,email,password}=req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test((email))) {
    return res.status(400).json({error:"Invalid email format"});   
}
const existinguser=await User.findOne({username});
if (existinguser) {
    return res.status(400).json({error:"username is already taken"});
}
const existMail=await User.findone({email});
if (existMail) {
    return res.status(400).json({error:"EMAIL is already taken"});
}
const salt=await bcrypt.genSalt(10);
const hashpass=await bcrypt.hash(password,salt);
const newUser=new User({
    fullname,
    username,
    email,
    password:hashpass
})
if (newUser) {
    generateT(newUser._id,res)
    await newUser.save();
    res.status(201).json({
        _id:newUser._id,
        fullname:newUser.fullname,
        username:newUser.username,
        email:newUser.email,
        followers:newUser.followers,
        following:newUser.following,
        profileImg:newUser.profileImg,
        coverImg:newUser.coverImg,
    })
}else{
    res.status(400).json({
   error:"invalid user data"
    })
}
} catch (error) {
    res.status(400).json({
        error:"Error in the signup window page "
         })
}


}

export const login=async (req,res)=>{
    res.json({
        data:"You hit the login endpoint",
    })
}

export const logout=async (req,res)=>{
    res.json({
        data:"You hit the loggout endpoint",
    })
}