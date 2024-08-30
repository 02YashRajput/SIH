import mongoose,{Schema} from "mongoose";
import { MarketPlace } from "./market-place.mjs";

const negotiationsSchema = new Schema({
  MarketPlaceId:{
    type: Schema.Types.ObjectId,
    ref: "MarketPlace",
    required: true,
  },
  BuyerId:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  BuyerName:{
    type: String,
    required: true,
  },
  FarmerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  FarmerName: {
    type: String,
    required: true,
  },
  productName:{
    type: String,
    r2equired: true
  },
 
  productQuantityBuyer:{
    type: Number,
    required: true
  },
  duration:{
    type: Number,
    required: true
  },

  initialPaymentAmountBuyer:{
    type: Number,
    required: true
  },
  finalPaymentAmountBuyer:{
    type: Number,
    required: true
  },
  initialPaymentAmountFarmer:{
    type: Number,
    required: true
  },
  finalPaymentAmountFarmer:{
    type: Number,
    required: true
  },
  productQuantityFarmer:{
    type: Number,
    required: true
  },
  lastUpdated:{
    type:String,
    enum: ['Farmer', 'Buyer', 'Admin'],
    required: true,
  }

  
})


export const Negotiations = mongoose.model("Negotiations",negotiationsSchema);