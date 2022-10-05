import Post from "../models/post";
import User from "../models/user"

const { ObjectID } = require('mongodb');




export const addUser = async (req,res)=>{

    console.log("postt---->",req.body)
   var { firstName, middleName,lastName,email,phone,  address,country,state,zip,height, weight} = req.body;
    try{

    const user = new Post({
      firstName,  
      middleName,
      lastName,
      email,
      phone,
      address,
      country,
      state,
      zip,
      height,
      weight
    });
      await user.save();
      console.log("sucessful", user);
  
      return res.json({
          data:user,
          ok: true,
      })

      }catch(err){
        console.log(err);
        res.sendStatus(404);
    }



}

export const getUser = async(req, res) =>{
  try{
    const user = await Post.find()
    console.log(user)
    res.json({
      data:user
    })
  }catch(err){
    console.log(err);
    res.sendStatus(404);
  }
}

export const deleteUser = async (req, res) => {
  try{
      const post = await Post.findByIdAndDelete(req.params._id)
      console.log(post);
      res.json({
        message: 'Delete data successfully'
      })
  }catch(err){

  }
}





















