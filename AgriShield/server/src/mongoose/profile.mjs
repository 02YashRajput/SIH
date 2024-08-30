import mongoose, { Schema } from "mongoose";

const farmerProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  myprofile: {
    photo:{
      type: String,
      trim:true,
    },
    address: {
      type: String,
      trim: true,
    },
  },



  notificationPreference: {
    type: String,
    enum: ["off", "on"],
    required: true,
  },
  paymentInformation: {
    bankDetails:
      {
        accountNumber:{
          type:Number,
          default:null,
        },
        accountHolderName:{
          type: String,
        },
        bankName:{
          type:String,
        },
        IFSCCode:{
          type: String,
        }
      },
  
    upiDetails:
      {
        upiId:{
          type: String,
        },
        upiName:{
          type: String,
        },
      },

    

  },
  farmDetails: {
    farmAddress: {
      type: String,
    },
    farmsSize: {
      type: String,
    },
    cropsGrown: [
      {
        type:String
      },
    ],
    annualYield: {
      type: Number,
    },
  },
});

const buyerProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  myprofile: {
    photo:{
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
  },

  notificationPreference: {
    type: String,
    enum: ["off", "on"],
    required: true,
  },
  paymentInformation: {
    bankDetails:
      {
        accountNumber:{
          type:Number,
        },
        accountHolderName:{
          type: String,
        },
        bankName:{
          type:String,
        },
        IFSCCode:{
          type: String,
        }
      },
   
    upiDetails:
      {
        upiId:{
          type: String,
        },
        upiName:{
          type: String,
        },
      },

    
  }
});

const adminProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  myprofile: {
    photo:{
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
  },
}) 

export const FarmerProfile = mongoose.model(
  "FarmerProfile",
  farmerProfileSchema
);
export const AdminProfile = mongoose.model("AdminProfile",adminProfileSchema); 
export const BuyerProfile = mongoose.model("BuyerProfile", buyerProfileSchema);
