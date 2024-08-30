import mongoose, { Schema } from "mongoose";
import AutoIncrementFactory from 'mongoose-sequence';

// Initialize AutoIncrement with the Mongoose connection
const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const contractSchema = new Schema({
  ContractId: {
    type: Number,
    unique: true, // Ensure that ContractId is unique
  },
  contractStatus: {
    type: String,
    enum: ["Ongoing", "Completed"],
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
  BuyerName: {
    type: String,
    required: true,
  },
  BuyerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  initialpaymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Received"],
    required: true,
  },
  finalpaymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Received"],
    required: true,
  },
  deliveryStatus: {
    type: String,
    enum: ["Pending", "Received", "Delivered"],
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  initialPaymentAmount: {
    type: Number,
    required: true,
  },
  finalPaymentAmount:{
    type:Number,
    required:true,
  },
  productAmount: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
});

// Apply the AutoIncrement plugin to the schema
contractSchema.plugin(AutoIncrement, { inc_field: 'ContractId' });

export const Contract = mongoose.model("Contract", contractSchema);
