import { Router } from "express";
import { MarketPlace } from "../mongoose/market-place.mjs";
import { ContractValidationSchema } from "../utils/validation/list-contract.mjs";
import { validationResult,matchedData } from "express-validator";
import { Crops } from "../mongoose/crops.mjs";
import { ActivateContractValidationSchema } from "../utils/validation/make-contract-schema.mjs";
import { Contract } from "../mongoose/contract.mjs";
import { BuyerProfile, FarmerProfile} from "../mongoose/profile.mjs";

const router = Router();
const crops = [
  "arhar",
  "bajra",
  "barley",
  "copra",
  "cotton",
  "gram",
  "groundnut",
  "jowar",
  "jute",
  "maize",
  "masoor",
  "moong",
  "niger",
  "paddy",
  "ragi",
  "rape",
  "safflower",
  "sesamum",
  "soyabean",
  "sugarcane",
  "sunflower",
  "urad",
  "wheat",
];

router.get("/api/market-place/profile", async (req, res) => {
  if (req.user) {  // Check if the user is authenticated
    try {
      console.log(req.user);
      let data;

      console.log(req.user._id);

      // Check the user's type to fetch the correct profile data
      if (req.user.userType === "Farmer") {
        data = await FarmerProfile.findOne({ userId: req.user._id });
      } else {
        data = await BuyerProfile.findOne({ userId: req.user._id }); // Use findOne here instead of findById for consistency
      }

      if (!data) {
        return res.status(404).send({ msg: "Profile not found" }); // Handle case where no profile is found
      }

      // Check if either bank details or UPI details are filled
      if (
        (data.paymentInformation.bankDetails.accountNumber && data.paymentInformation.bankDetails.accountNumber !== 0) || // Checks for valid account number
        data.paymentInformation.upiDetails.upiId // Checks for valid UPI ID
      ) {
        return res.status(200).send({ msg: "Yes" });
      }

      // If none of the payment details are filled
      res.status(200).send({ msg: "No" });
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).send({ msg: "Internal Server Error" });
    }
  } else {
    res.status(404).send({ msg: "User not found" });
  }
});



router.get("/api/market-place", async (req, res) => {
  if (req.user) {
    try {
      let contracts;

      if (req.user.userType === "Buyer") {
        contracts = await MarketPlace.find({ BuyerId: req.user._id });
      } else {
        contracts = await MarketPlace.find();
        console.log(contracts)
      }

      // Remove BuyerId from each contract


      res.status(200).send({
        msg: "user found",
        data: {
          user: {
            name: req.user.name,
            userType: req.user.userType,
          },
          listedContracts: contracts, 
        },
      });
    } catch (err) {
      return res.status(400).send("An error occurred while fetching data");
    }     
  } else {
    res.status(404).send({ msg: "user not found" });
  }
});



router.post("/api/market-place/list-contract", ContractValidationSchema, async (req, res) => {
  if (req.user) {
    const result = validationResult(req);
console.log(req.body)
    if (!result.isEmpty()) {
      console.log(result.array())
      return res
        .status(400)
        .send({ msg: "Error during validation", errors: result.array() });
    }

    const contract = matchedData(req);
    contract.BuyerId = req.user.id;
    contract.BuyerName = req.user.name;

    try {
      const crop = await Crops.findOne({ name: contract.productName });
      if (!crop) {
        return res.status(404).send({ message: "Crop not found" });
      }
      contract.productImage = crop.image;
      console.log(contract)
      const newContract = new MarketPlace(contract);
      await newContract.save();
      res.status(201).send({ message: "Contract created successfully" });

    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Error creating contract", error: err.message });
    }
  } else {
    res.status(404).send({ msg: "User not found" });
  }
});

router.post("/api/market-place/make-contract", ActivateContractValidationSchema, async (req, res) => {
  if (req.user) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).send({ msg: "Error during validation", errors: result.array() });
    }

    const contract =req.body;
 
    let contractObj = {}; // Initialize contractObj as an empty object

    contractObj.contractStatus = "Ongoing";
    contractObj.FarmerId = req.user._id;
    contractObj.FarmerName = req.user.name;
    contractObj.initialpaymentStatus = "Pending";
    contractObj.finalpaymentStatus = "Pending";
    contractObj.deliveryStatus = "Pending";
    contractObj.BuyerId = contract.BuyerId;
    contractObj.BuyerName = contract.BuyerName;
    contractObj.initialPaymentAmount = contract.initialPaymentAmount;
    contractObj.finalPaymentAmount = contract.finalPaymentAmount;
    contractObj.productName = contract.productName;

    const deadline = new Date();
    deadline.setMonth(deadline.getMonth() + contract.duration);
    contractObj.deadline = deadline;
    contractObj.productAmount = contract.productQuantity;
    

    try {
      // Find and delete the contract from the MarketPlace collection using contract._id
      const deletedMarketPlaceContract = await MarketPlace.findByIdAndDelete(contract._id);

      if (!deletedMarketPlaceContract) {
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

export default router;