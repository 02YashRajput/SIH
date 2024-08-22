
import {Router} from "express";

const router = Router();


router.get("/api/dashboard",async(req,res)=>{
  if(req.user){
    console.log(req.user);
    res.status(200).send({msg:"user found",data:{user : {name :req.user.name,userType : req.user.userType}}});
  }
  else{
    res.status(400).send({msg:"user not found"});
  }
}) 

export default router;