import {Router } from "express";
import { ContactUsSchema } from "../utils/validation/contact-us-schema.mjs";
import { ContactUs } from "../mongoose/contact-us.mjs";
import { matchedData, validationResult } from "express-validator";


const router  = Router();

router.get("/api/contact-us",async(req,res)=>{
  if(req.user){
    res.status(200).send({msg:"user found",data:{user : {name :req.user.name,userType : req.user.userType}}});
  }
  else{
    res.status(404).send({msg:"user not found"});
  }
}) 

router.post("/api/contact-us",ContactUsSchema,async(req,res)=>{
  const result = validationResult(req);
  if(!result.isEmpty()) {

    return res.status(400).send({message:"Error during validation ",err:result.array()});
  }
  const data = matchedData(req);
  try{
    data.senderId = req.user.id;
    const newReq = new ContactUs(data);
    await newReq.save();
    return res.status(201).send({message:"Request saved successfully"});
  } catch(err){
    return res.status(400).send({message:"Error during saving Data ",err});
  }

})


export default router;