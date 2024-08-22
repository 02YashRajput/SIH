import mongoose, {Schema} from "mongoose";

const contactUsSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true, 
  },
  email: {
    type: String,
    required: [true, "Email cannot be empty"],
    trim: true,
    unique:false,
    match: [
      /^\S+@\S+\.\S+$/,
      "Please enter a valid email address",
    ],
  },
  name: {
    type: String,
    required: [true, "Name cannot be empty"],
    trim: true,
  },
  phone: {
    type: String,
    unique:false,

    required: [true, "Phone number cannot be empty"],
    trim: true,
    match: [
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian mobile number",
    ],
  },
  userType:{
    type:String,
    enum:['Farmer','Buyer', 'Admin'],
    required:true,
  },
  msg : {
    type:String,
    trim: true,
    required:true
  }
})

export const ContactUs = mongoose.model("ContactUs",contactUsSchema);