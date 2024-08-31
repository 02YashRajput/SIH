import { Router } from "express";
import passport from "passport";
import "../strategies/local-strategy.mjs";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { loginSchema } from "../utils/validation/userSchema.mjs";

const router = Router();

router.post("/api/login",loginSchema,(req,res,next)=>{
  const result = validationResult(req);

  if(!result.isEmpty()){
    console.log(result.array())
    return res.status(400).send(result.array());
  }
  next()},
  passport.authenticate("local"),(req,res)=>{
    res.status(200).send("User Logged in Successfully");
  }

);

export default router;


