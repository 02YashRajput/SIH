

import { checkSchema } from 'express-validator';

export const validateFarmerProfile = checkSchema({
  userId: {
    in: ['body'],
    isMongoId: true,
    errorMessage: 'Invalid userId',
  },
  'myprofile.profilePhoto': {
    in: ['body'],
    optional: true,
    isString: true,
    trim: true,
    errorMessage: 'Invalid profile photo URL',
  },
  'myprofile.phone':{
    in: ['body'], // Specify that 'phone' is expected in the request body
    notEmpty: {
      errorMessage: "Phone number cannot be empty",
    },
    isMobilePhone: {
      options: 'en-IN', // Indian locale for mobile numbers
      errorMessage: "Please enter a valid Indian mobile number",
    },
  },
  'myprofile.name':{
    in: ['body'], // Specify that 'name' is expected in the request body
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
    isString: {
      errorMessage: "Name must be a string!",
    },
  },
  'myprofile.email':{
    in: ['body'],
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
    isString: {
      errorMessage: "Email must be a string!",
    },
    isEmail: {
      errorMessage: "Please enter a valid email address",
    },
  },
  'myprofile.address': {
    in: ['body'],
    optional: true,
    isString: true,
    trim: true,
    errorMessage: 'Invalid address',
  },
  notificationPreference: {
    in: ['body'],
    isIn: {
      options: [['off', 'on']],
      errorMessage: 'Notification preference should be either on or off',
    },
  },
  'paymentInformation.cardDetails.*.cardHolderName': {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'Card holder name is required',
  },
  'paymentInformation.cardDetails.*.cardNumber': {
    in: ['body'],
    isNumeric: true,
    notEmpty: true,
    errorMessage: 'Card number is required and should be numeric',
  },
  'paymentInformation.cardDetails.*.expiryDate': {
    in: ['body'],
    matches: {
      options: [/^(0[1-9]|1[0-2])\/[0-9]{2}$/],
      errorMessage: 'Expiry date should be in the format MM/YY',
    },
  },
  'paymentInformation.upiDetails.*.upiId': {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'UPI ID is required',
  },
  'paymentInformation.upiDetails.*.upiName': {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'UPI Name is required',
  },
  'farmDetails.farmAddress': {
    in: ['body'],
    optional: true,
    isString: true,
    trim: true,
    errorMessage: 'Invalid farm address',
  },
  'farmDetails.farmsSize': {
    in: ['body'],
    optional: true,
    isString: true,
    trim: true,
    errorMessage: 'Invalid farm size',
  },
  'farmDetails.cropsGrown.*.crop': {
    in: ['body'],
    optional: true,
    isString: true,
    trim: true,
    errorMessage: 'Invalid crop name',
  },
  'farmDetails.annualYield': {
    in: ['body'],
    optional: true,
    isNumeric: true,
    errorMessage: 'Annual yield should be a number',
  },
});


export const validateBuyerProfile = checkSchema({
  userId: {
    in: ['body'],
    isMongoId: true,
    errorMessage: 'Invalid userId',
  },
  'myprofile.profilePhoto': {
    in: ['body'],
    optional: true,
    isString: true,
    trim: true,
    errorMessage: 'Invalid profile photo URL',
  },
  'myprofile.phone':{
    in: ['body'], // Specify that 'phone' is expected in the request body
    notEmpty: {
      errorMessage: "Phone number cannot be empty",
    },
    isMobilePhone: {
      options: 'en-IN', // Indian locale for mobile numbers
      errorMessage: "Please enter a valid Indian mobile number",
    },
  },
  'myprofile.name':{
    in: ['body'], // Specify that 'name' is expected in the request body
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
    isString: {
      errorMessage: "Name must be a string!",
    },
  },
  'myprofile.email':{
    in: ['body'],
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
    isString: {
      errorMessage: "Email must be a string!",
    },
    isEmail: {
      errorMessage: "Please enter a valid email address",
    },
  },
  'myprofile.address': {
    in: ['body'],
    optional: true,
    isString: true,
    trim: true,
    errorMessage: 'Invalid address',
  },
  notificationPreference: {
    in: ['body'],
    isIn: {
      options: [['off', 'on']],
      errorMessage: 'Notification preference should be either on or off',
    },
  },
  'paymentInformation.cardDetails.*.cardHolderName': {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'Card holder name is required',
  },
  'paymentInformation.cardDetails.*.cardNumber': {
    in: ['body'],
    isNumeric: true,
    notEmpty: true,
    errorMessage: 'Card number is required and should be numeric',
  },
  'paymentInformation.cardDetails.*.expiryDate': {
    in: ['body'],
    matches: {
      options: [/^(0[1-9]|1[0-2])\/[0-9]{2}$/],
      errorMessage: 'Expiry date should be in the format MM/YY',
    },
  },
  'paymentInformation.upiDetails.*.upiId': {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'UPI ID is required',
  },
  'paymentInformation.upiDetails.*.upiName': {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'UPI Name is required',
  },
});


export const validateAdminProfile = checkSchema({
  userId: {
    in: ['body'],
    isMongoId: true,
    errorMessage: 'Invalid userId',
  },
  'myprofile.phone':{
    in: ['body'], // Specify that 'phone' is expected in the request body
    notEmpty: {
      errorMessage: "Phone number cannot be empty",
    },
    isMobilePhone: {
      options: 'en-IN', // Indian locale for mobile numbers
      errorMessage: "Please enter a valid Indian mobile number",
    },
  },
  'myprofile.name':{
    in: ['body'], // Specify that 'name' is expected in the request body
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
    isString: {
      errorMessage: "Name must be a string!",
    },
  },
  'myprofile.email':{
    in: ['body'],
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
    isString: {
      errorMessage: "Email must be a string!",
    },
    isEmail: {
      errorMessage: "Please enter a valid email address",
    },
  },
  'myprofile.profilePhoto': {
    in: ['body'],
    optional: true,
    isString: true,
    trim: true,
    errorMessage: 'Invalid profile photo URL',
  },
  'myprofile.address': {
    in: ['body'],
    optional: true,
    isString: true,
    trim: true,
    errorMessage: 'Invalid address',
  },
});
