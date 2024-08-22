import { Router } from "express";
import { ChangePasswordSchema } from "../utils/validation/change-password-validation.mjs";
import { comparePassword } from "../utils/helper/hashPassword.mjs";


const router = Router();

router.patch("/api/profile/changePassword",ChangePasswordSchema,async(req,res)=>{
  if(req.user){

    const result = validationResult(request);
    
    if (!result.isEmpty()) {
      return response.status(400).send({msg:"Error during validation ",err:result.array()});
    };
    try{

      const data = matchedData(request);
      const savedPassword  = User.findbyid(req.user.id);
      const isMatch = await comparePassword(data.oldpassword,savedPassword);
      if(!isMatch){
        throw new Error("Wrong Password ");
      }
      else{
        if(data.newpassword === data.confirmpassword){
        data.password = hashPassword(data.newpassword);
        await User.findByIdAndUpdate(req.user.id,data,{new:true});
        res.status(200).send({msg:"Password changed successfully"});
      }
    }
  }catch(err){

    res.status(500).send({msg:"Error while changing password"});
  }
  }else{
    res.status(400).send({msg:"user not found"});
  }
})
