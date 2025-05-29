const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const login = async(req,res)=>{
    const {email,password} = req.body;
    try{

        const user = await User.findOne({email});
        if(!user){
            res.send(404).json({
                success:false,
                message:"User does not exists"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }

        const token = jwt.sign({ 
            id: user._id, 
            username: user.username 
        },
      process.env.SECRET_KEY, // use env variable in production!
      { expiresIn: "1h" }
    );
        
        res.status(200).json({
            success:true,
            message:"Login successfull",
            data:{
                email,
                token,
                username:user.username,
            }
        })
        
    }catch(error){
        res.status(404).json({
            success:false,
            message:error.message
        });
    }
}

const signup = async(req,res)=>{
    const {username,email,password} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(500).json({
                success:false,
                message:"User already exists. Please log in"
            })
        }
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password,saltRounds);
        const newUser = new User({username,email,password:hashedPassword});
        await newUser.save();
        res.status(200).json({
            success:true,
            message:"User Created successfully"
        })

    }catch(error){
        res.status(404).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {login,signup};