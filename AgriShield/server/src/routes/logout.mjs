import { Router } from "express";

const router =Router();


router.post("/api/logout",(req,res)=>{
  if(req.user){
  req.logOut((err)=>{
        if(err) return res.sendStatus(400);
        res.status(200).send({msg: 'user logged out'});
      });

  }else{
    res.status(404).send({ msg: "User not found" });

  }

})
export default router;