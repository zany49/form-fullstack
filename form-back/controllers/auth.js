
import User from '../models/user'
import { hashPassword,comparePassword } from '../helpers/auth'
import jwt from 'jsonwebtoken';
import {nanoid} from 'nanoid';
import Crypto from 'crypto';
import nodemailer from 'nodemailer';



export const register =async(req, res)=>{
    // console.log("your registered",req.body);
    var{username,password,confirmpassword} = req.body;
    username = username
    console.log("username--->",username,password,confirmpassword)

  
    if(!username){ 
    return res.json({
        error:"User Name Is Required"

    })
  }

    if(!password || password.length< 6) 
    {
      return res.json({error:"Pasword length must be above 6 characters"})
    }

    if(confirmpassword!==password){
      return res.json({error:"Pasword does'nt match"})
    }
     
     
    
    const existing = await User.findOne({username});
    console.log("existing-->",existing)
     if (existing) 
     {
        return res.json({error:"username is already in use"})
     }

     
   //hash pwd
    const hashPwd = await hashPassword(password);

    const user = new User({
      username:username,  
      password: hashPwd
    });
    try{
      await user.save();
      console.log("sucessful", user);
  
      return res.json({
          data:user,
          ok: true,
      })
    }catch(err){
       console.log("register failed",err);
       {
         return res.json({error:"error,try again"})
       }
       
    }
};




export const login = async (req, res)=>{
try{
    // console.log(req.body);
 
    const {username , password}= req.body;
    const user = await User.findOne({ username })
    if(!user)  
    {
      return res.json({error:"No User Email Found"})
    }

    const match = await comparePassword(password, user.password)
    if(!match) 
    {
      return res.json({error:"Wrong password"})
    }

    const token = jwt.sign({_id: user.id},process.env.JWT_SECRET,{
      expiresIn: "7d", 
    });

    user.password = undefined;
    user.secret = undefined;

    res.json({
      token,
      user,
    })

}catch(err){
    console.error(err);
    {
      return res.json({error:"error,try again"})
    }
}
};


export const currentUser =async(req,res) =>{
  try{
      const user = await User.findOne(req.user_id);
      // res.json(user);
      res.json({ok: true})
  }catch(err){
    console.log(err);
    res.sendStatus(400);
  }
  };













