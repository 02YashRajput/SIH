import mongoose, { Schema } from "mongoose";

const farmerProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  myprofile: {
    address: {
      type: String,
      trim: true,
    },
  },

  transactions: [
    {
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        required: true,
        default: Date.now,
      },
      type: {
        type: String,
        enum: ["credit", "debit"],
        required: true,
      },
    },
  ],

  notificationPreference: {
    type: String,
    enum: ["off", "on"],
    required: true,
  },
  paymentInformation: {
    bankDetails: [
      {
        bankName: {
          type: String,
        },
        accountNumber: {
          type: String,
        },
        accountHolderName: {
          type: String,
        },
        ifscCode: {
          type: String,
        },
        branchName: {
          type: String,
        },
      },
    ],
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
        crop: {
          type: String,
        },
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
    address: {
      type: String,
      trim: true,
    },
  },
  transactions: [
    {
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        required: true,
        default: Date.now,
      },
      type: {
        type: String,
        enum: ["credit", "debit"],
        required: true,
      },
    },
  ],
  notificationPreference: {
    type: String,
    enum: ["off", "on"],
    required: true,
  },
  paymentInformation: {
    bankDetails: [
      {
        bankName: {
          type: String,
        },
        accountNumber: {
          type: String,
        },
        accountHolderName: {
          type: String,
        },
        ifscCode: {
          type: String,
        },
        branchName: {
          type: String,
        },
      },
    ],
  },
});

const adminProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  myprofile: {
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
