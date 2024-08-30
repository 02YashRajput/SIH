import { Router } from "express";
import { ChangePasswordSchema } from "../utils/validation/change-password-validation.mjs";
import { comparePassword,hashPassword } from "../utils/helper/hashPassword.mjs";
import { validationResult,matchedData } from "express-validator";
import { User } from "../mongoose/user.mjs";
import { BuyerProfile, FarmerProfile,AdminProfile } from "../mongoose/profile.mjs";


const router = Router();
router.get("/api/profile", async (req, res) => {
  if (req.user) {
    const user = req.user;
    const id = user._id;
    let profileData;

    try {
      if (user.userType === "Farmer") {
        profileData = await FarmerProfile.findOne({userId:id});
      } else if (user.userType === "Buyer") {
        profileData = await BuyerProfile.findOne({userId:id});
      } else {
        profileData = await AdminProfile.findOne({userId:id});
      }
      if (!profileData) {
        return res.status(404).send({ msg: "Profile not found" });
      }
      profileData = profileData.toObject();
        
      profileData.myprofile.email= user.email;
      profileData.myprofile.name =  user.name;
      profileData.myprofile.phone =  user.phone ;
      profileData.myprofile.userType =  user.userType ;
      delete profileData.userId;
      delete profileData._id;


      return res.status(200).send({ msg: "User found", data: profileData });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ msg: "Server error" });
    }
  } else {
    return res.status(404).send({ msg: "User not found" });
  }
});


router.patch("/api/profile/change-password",ChangePasswordSchema,async(req,res)=>{
  if(req.user){
    const result = validationResult(req);
    
    if (!result.isEmpty()) {
      
      return res.status(400).send({msg:"Error during validation ",err:result.array()});
    };
    try{

      const data = matchedData(req);
      const id = req.user._id
      const user = await User.findById(id);

      const isMatch = await comparePassword(data.oldpassword,user.password);
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
    res.status(404).send({msg:"user not found"});
  }
})



router.post("/api/profile/photo", async (req, res) => {
  if (req.user) {
    try {

      // Assuming you have some logic to determine user type
      // Uncomment and adjust the following based on your user type check
      if (req.user.userType === "Farmer") {
        const data = await FarmerProfile.findOne({ userId: req.user.id });
        data.myprofile.photo = req.body.photo; // Assuming req.body.photo contains base64 string
        await data.save(); // Don't forget to save changes to the database
      }
      else if(req.user.userType === "Buyer"){
        const data = await BuyerProfile.findOne({userId:req.user._id});
        data.myprofile.photo = req.body.photo; // Assuming req.body.photo contains base64 string
        await data.save(); // Don't forget to save changes to the database
      }else{
        const data = await AdminProfile.findOne({userId:req.user._id});
        data.myprofile.photo = req.body.photo; // Assuming req.body.photo contains base64 string
        await data.save(); 
      }

      
      return res.status(200).send("Uploaded successfully");

    } catch (err) {
      console.error("Error while updating profile:", err);
      res.status(500).send({ msg: "Error while updating profile" });
    }
  } else {
    res.status(404).send({ msg: "User not found" });
  }
});

router.post("/api/profile", async (req, res) => {
  try {
    const data = req.body;
    if (req.user) {
      if (req.user.userType === "Farmer") {
        await FarmerProfile.findOneAndUpdate({ userId: req.user.id }, data, {
          new: true, // returns the updated document
          runValidators: true, // runs schema validations
        });
      } else if (req.user.userType === "Buyer") {
        await BuyerProfile.findOneAndUpdate({ userId: req.user._id }, data, {
          new: true,
          runValidators: true,
        });
      }
      res.status(200).send({ msg: "Profile Updated Successfully" });
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send({ msg: "Server error" });
  }
});





export default router;