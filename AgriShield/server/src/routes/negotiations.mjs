
import {Router} from "express";
import { Negotiations } from "../mongoose/negotiation.mjs";
import { negotiationsValidationSchema } from "../utils/validation/negotiationSchema.mjs";
import { validationResult } from "express-validator";
import { MarketPlace } from "../mongoose/market-place.mjs";
import { Contract } from "../mongoose/contract.mjs"; 
const router = Router();


router.get("/api/negotiations", async (req, res) => {
  if (req.user) {
    try {
      let negotiations;
      if (req.user.userType === "Farmer") {
        negotiations = await Negotiations.find({ FarmerId: req.user._id });
      } else if (req.user.userType === "Buyer") {
        negotiations = await Negotiations.find({ BuyerId: req.user._id });
      } else {
        return res.status(400).send({ msg: "Invalid user type" });
      }

      res.status(200).send({
        msg: "Negotiations found",
        data: {
          user:{name :req.user.name,userType : req.user.userType},
          negotiations:negotiations
        }
      });
    } catch (err) {
      res.status(500).send({ msg: "Error retrieving negotiations", error: err.message });
    }
  } else {
    res.status(404).send({ msg: "User not found" });
  }
});

router.post("/api/negotiations/initial",negotiationsValidationSchema,async(req,res)=>{
  if (req.user) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).send({ msg: "Error during validation", errors: result.array() });
    }

    const contract =req.body;
    contract.FarmerId = req.user._id;
    contract.FarmerName = req.user.name;
      try{
        const newNegotiation = new Negotiations(contract);
        await newNegotiation.save();
        res.status(201).send({ msg: "Negotiation created successfully" });
      }catch(err){
        res.status(500).send({ msg: "Error saving negotiation", error: err.message });
      }


  } else {
    res.status(404).send({ msg: "User not found" });
  }
})


router.post("/api/negotiations/make-contract",  async (req, res) => {
  if (req.user) {
    
    const contract =req.body;
    console.log(contract)
    let contractObj = {}; // Initialize contractObj as an empty object

    contractObj.contractStatus = "Ongoing";
    contractObj.FarmerId = contract.FarmerId;
    contractObj.FarmerName = contract.FarmerName;
    contractObj.initialpaymentStatus = "Pending";
    contractObj.finalpaymentStatus = "Pending";
    contractObj.deliveryStatus = "Pending";
    contractObj.BuyerId = contract.BuyerId;
    contractObj.BuyerName = contract.BuyerName;
    contractObj.initialPaymentAmount = req.user.userType === "Farmer"? contract.initialPaymentAmountBuyer : contract.initialPaymentAmountFarmer;
    contractObj.finalPaymentAmount = req.user.userType === "Farmer"? contract.finalPaymentAmountBuyer:contract.finalPaymentAmountFarmer;
    contractObj.productName = contract.productName;
    contractObj._id = contract._id
    const deadline = new Date();
    deadline.setMonth(deadline.getMonth() + contract.duration);
    contractObj.deadline = deadline;
    contractObj.productAmount =  req.user.userType === "Farmer" ?  contract.productQuantityBuyer:contract.productQuantityFarmer;
   

    try {
      // Find and delete the contract from the MarketPlace collection using contract._id
      const deletedMarketPlaceContract = await MarketPlace.findByIdAndDelete(contract.MarketPlaceId);


      if (!deletedMarketPlaceContract) {
        return res.status(404).send({ message: "Contract not found in MarketPlace" });
      }
      const deletedNegotiations = await Negotiations.findByIdAndDelete(contract._id); 
      if (!deletedNegotiations) {
        return res.status(404).send({ message: "Contract not found in MarketPlace" });
      }

      // Add contractObj to the Contract collection
      const newContract = new Contract(contractObj);
      await newContract.save();

      res.status(201).send({ message: "Contract created successfully" });

    } catch (err) {
      return res.status(400).send({ message: "Error processing contract", error: err.message });
    }

  } else {
    res.status(404).send({ msg: "User not found" });
  }
});



router.post("/api/negotiations", negotiationsValidationSchema, async (req, res) => {
  if (req.user) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).send({ msg: "Error during validation", errors: result.array() });
    }

    const contract = req.body;

    try {
      // Find the negotiation by ID and update it
      const updatedNegotiation = await Negotiations.findByIdAndUpdate(
        contract._id, // ID of the document to update
        { $set: contract }, // Update fields
        { new: true } // Return the updated document
      );

      if (!updatedNegotiation) {
        return res.status(404).send({ msg: "Negotiation not found" });
      }

      res.status(200).send({ msg: "Negotiation updated successfully", negotiation: updatedNegotiation });
    } catch (err) {
      console.error(err); // Log error for debugging
      res.status(500).send({ msg: "Error saving negotiation", error: err.message });
    }

  } else {
    res.status(404).send({ msg: "User not found" });
  }
});





export default router;
