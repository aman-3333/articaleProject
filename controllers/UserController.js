
const UserModel = require('../models/UserModel');
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const SECRET_KEY ="UserArticaleProject"
const {successResponse, errorResponse} = require("../service/apiresponse")
 const signup = async (req, res) => {
    const {email,password,username}=req.body
    try {
      const existingUser = await UserModel.findOne({ email:email })
      if(existingUser){
        return res.status(400).json({message:"User Already exists"})
      }

     const hashedPassword=await bcrypt.hash(password,10)
     const userData=await UserModel.create({
        email:email,
        password:hashedPassword,
        username:username
     })
     const token=jwt.sign({email:userData.email,id:userData._id},"Stack", {
        expiresIn: '24h' 
         },SECRET_KEY);
        
         res.status(200).json(successResponse("signup",{existingUser,token},res.statusCode))
    } catch (error) {
        res.status(500).json(errorResponse("error in signup", res.statusCode));
    }
  };






  const signin = async (req, res) => {
    const {email,password}=req.body
    try {
      const existingUser = await UserModel.findOne({ email:email })
      console.log(existingUser,"existingUser");
      if(!existingUser){
        return res.status(404).json({message:"User not exists"})
      }

     const matchPassword=await bcrypt.compare(password,existingUser.password)
     console.log(matchPassword,"matchPassword");
     if(!matchPassword){
        return res.status(400).json({message:"Invalid Credentials"})
      }
    
     const token=jwt.sign({email:existingUser.email,id:existingUser._id},"Stack", {
        expiresIn: '24h' 

         },SECRET_KEY);
     console.log("token",token);
     res.status(200).json(successResponse("signin",{existingUser,token},res.statusCode))
 
    } catch (error) {
        res.status(500).json(errorResponse("error in signin", res.statusCode));
    }
  };




const findAllUser = async (req, res) => {
  try {
    const User = await UserModel.find();
    res.status(200).json(successResponse("findAllUser",User,res.statusCode))
    } catch (error) {
        res.status(500).json(errorResponse("error in findAllUser", res.statusCode));
    }
  };

const findOneUser = async (req, res) => {
  try {
    const User = await UserModel.findOne({ _id: req.body.UserId });
    res.status(200).json(successResponse("findOneUser",User,res.statusCode))
} catch (error) {
    res.status(500).json(errorResponse("error in findOneUser", res.statusCode));
}
};


const updateUser = async (req, res) => {
  try {
    const {age,username}=req.body
    const userId=req.params.userId
    let User = await UserModel.findOne( {_id: userId} )
    if(!User){
        return res.status(404).json({message:"User not exists"})
      }
    
    let UserUpdate = await UserModel.findOneAndUpdate(
      { _id: userId },
    {$set:{ username: username,age:age}}, { new: true }
    );
    res.status(200).json(successResponse("UserUpdate",UserUpdate,res.statusCode))
} catch (error) {
    res.status(500).json(errorResponse("error in UserUpdate", res.statusCode));
}
};


const deleteUser = async (req, res) => {
  try {
    const UserRemoved = await UserModel.findByIdAndDelete(req.body.UserId);
    res.status(200).json(successResponse("deleteUser",UserRemoved,res.statusCode))
} catch (error) {
    res.status(500).json(errorResponse("error in deleteUser", res.statusCode));
}
};
module.exports = {
    signup,
    signin,
  findAllUser,
  findOneUser,
  updateUser,
  deleteUser
}