import { Router } from "express";
import { hashPassword } from "../utils/helper/hashPassword.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator";
import { signUpSchema } from "../utils/validation/userSchema.mjs";
import "../strategies/local-strategy.mjs";
import { User } from "../mongoose/user.mjs";
import {
  AdminProfile,
  BuyerProfile,
  FarmerProfile,
} from "../mongoose/profile.mjs";

const router = Router();

router.post("/api/sign-up", signUpSchema, async (request, response) => {
  const result = validationResult(request);

  if (!result.isEmpty()) {
    return response
      .status(400)
      .send({ msg: "Error during validation ", err: result.array() });
  }

  const data = matchedData(request);
  data.password = hashPassword(data.password);

  try {
    const newUser = new User(data);
    const savedUser = await newUser.save();
    if (savedUser.userType === "Farmer") {
      const newFarmer = new FarmerProfile({
        userId: savedUser.id,
        myprofile: { photo: "", address: "" }, // This ensures the 'myprofile' object is created, but empty
        notificationPreference: "off",
        paymentInformation: { bankDetails: {
          accountNumber:null,
          accountHolderName:"",
          bankName:"",
          IFSCCode:""
        }, upiDetails: {
          upiId: "",
          upiName: "",
        } },
        farmDetails: {
          farmAddress: "",
          farmsSize: "",
          cropsGrown: [],
          annualYield: "",
        },
      });
      await newFarmer.save();
    } else if (savedUser.userType === "Admin") {
      const newAdmin = new AdminProfile({
        userId: savedUser.id,
        myprofile: { photo: "", address: "" }, // Empty myprofile object
      });
      await newAdmin.save();
    } else {
      const newBuyer = new BuyerProfile({
        userId: savedUser.id,
        myprofile: { photo: "", address: "" },
        notificationPreference: "off",
        paymentInformation:{ bankDetails: {
          accountNumber:null,
          accountHolderName:"",
          bankName:"",
          IFSCCode:""
        }, upiDetails: {
          upiId: "",
          upiName: "",
        } },
      });
      await newBuyer.save();
    }
    request.login(savedUser, async (err) => {
      if (err) {
        console.error("Error during login:", err);
        return response
          .status(500)
          .send({ message: "Error creating user and logging in" });
      }

      return response
        .status(201)
        .json({ message: "User created and logged in successfully" });
    });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      console.log(err)
      return response.status(400).send({ message: "Email already exists" });
    }
    console.log(err);
    return response.status(500).send({ message: "Error creating user" });
  }
});

export default router;
