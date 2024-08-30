import { Router } from "express";
import { Contract } from "../mongoose/contract.mjs";
import { MarketPlace } from "../mongoose/market-place.mjs";
import { Negotiations } from "../mongoose/negotiation.mjs";

const router = Router();

router.get("/api/my-contracts", async (req, res) => {
  if (req.user) {
    try {
      let contracts;
      if (req.user.userType === "Farmer") {
        contracts = await Contract.find({ FarmerId: req.user.id });
      } else {
        contracts = await Contract.find({ BuyerId: req.user.id });
      }

      // Remove FarmerId and BuyerId from each contract
      contracts = contracts.map((contract) => {
        const contractObj = contract.toObject(); // Convert Mongoose Document to plain JavaScript object

        // Determine the current status based on payment and delivery statuses
        if (contractObj.initialpaymentStatus !== "Received") {
          contractObj.currentStatus = [
            "Initial Payment ",
            contractObj.initialpaymentStatus,
          ];
        } else if (contractObj.deliveryStatus !== "Received") {
          contractObj.currentStatus = [
            "Product Delivery ",
            contractObj.deliveryStatus,
          ];
        } else {
          contractObj.currentStatus = [
            "Final Payment ",
            contractObj.finalpaymentStatus,
          ];
        }

        // Remove FarmerId and BuyerId from the contract object
        delete contractObj.FarmerId;
        delete contractObj.BuyerId;
        delete contractObj._id;

        return contractObj;
      });

      res.status(200).send({
        msg: "user found",
        data: {
          contracts: contracts,
          user: { name: req.user.name, userType: req.user.userType },
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ msg: "an error occurred" });
    }
  } else {
    res.status(404).send({ msg: "user not found" });
  }
});



export default router;
