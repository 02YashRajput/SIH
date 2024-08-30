import mongoose,{Schema} from "mongoose";

const marketPlaceSchema = new Schema({

  BuyerId:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  BuyerName:{
    type: String,
    required: true,
  },
  productName:{
    type: String,
    required: true
  },
  productDescription:{
    type: String,
    required: true
  }
,

  productQuantity:{
    type: Number,
    required: true
  },
  duration:{
    type: Number,
    required: true
  },
  productImage:{
    type: String,
    required: true
  }
  ,
  initialPaymentAmount:{
    type: Number,
    required: true
  },
  finalPaymentAmount:{
    type: Number,
    required: true
  }
  ,
  location: {
    latitude: {
      type: Number,  // Changed to Number type
      required: true,
    },
    longitude: {
      type: Number,  // Changed to Number type
      required: true,
    },
  },
})


export const MarketPlace = mongoose.model("MarketPlace",marketPlaceSchema);