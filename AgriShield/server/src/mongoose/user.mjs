import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: [true, "Email cannot be empty"],
    trim: true,
    unique: true,
    match: [
      /^\S+@\S+\.\S+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    required: [true, "Name cannot be empty"],
    trim: true,
  },
  phone: {
    type: String,
    unique: true,
    trim: true,
    required: true,

    match: [
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian mobile number",
    ],
  },
  userType: {
    type: String,
    enum: ['Farmer', 'Buyer', 'Admin'],
    required: true,
  },
});

export const User = mongoose.model('User', userSchema);
