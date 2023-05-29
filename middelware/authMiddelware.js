const userModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "UserArticaleProject"
const isAuthenticated = async (req,res,next)=>{
    try {
        const token = req.headers.authorization;
      
        if(!token){
            return next('Please login to access the data');
        }
        const verify = await jwt.decode(token)
        console.log(verify,"verify");
        req.user = await userModel.findById(verify.id);
        next();
    } catch (error) {
       return next(error); 
    }
}

module.exports = isAuthenticated;