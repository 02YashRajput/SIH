import { checkSchema } from 'express-validator';

export const negotiationsValidationSchema = checkSchema({
  BuyerId: {
    in: ['body'],
    isMongoId: {
      errorMessage: 'Invalid Buyer ID',
    },
    exists: {
      errorMessage: 'Buyer ID is required',
    },
  },
  BuyerName: {
    in: ['body'],
    isString: {
      errorMessage: 'Buyer Name must be a string',
    },
    notEmpty: {
      errorMessage: 'Buyer Name is required',
    },
  },
  productName: {
    in: ['body'],
    isString: {
      errorMessage: 'Product Name must be a string',
    },
    notEmpty: {
      errorMessage: 'Product Name is required',
    },
  },
  productQuantityBuyer: {
    in: ['body'],
    isInt: {
      errorMessage: 'Product Quantity Buyer must be an integer',
    },
    toInt: true,
    isInt: {
      options: { min: 1 },
      errorMessage: 'Product Quantity Buyer must be a positive integer',
    },
    exists: {
      errorMessage: 'Product Quantity Buyer is required',
    },
  },
  duration: {
    in: ['body'],
    isInt: {
      errorMessage: 'Duration must be an integer',
    },
    toInt: true,
    isInt: {
      options: { min: 1 },
      errorMessage: 'Duration must be a positive integer',
    },
    exists: {
      errorMessage: 'Duration is required',
    },
  },
  initialPaymentAmountBuyer: {
    in: ['body'],
    isFloat: {
      errorMessage: 'Initial Payment Amount Buyer must be a number',
    },
    toFloat: true,
    isFloat: {
      options: { min: 0 },
      errorMessage: 'Initial Payment Amount Buyer must be a non-negative number',
    },
    exists: {
      errorMessage: 'Initial Payment Amount Buyer is required',
    },
  },
  finalPaymentAmountBuyer: {
    in: ['body'],
    isFloat: {
      errorMessage: 'Final Payment Amount Buyer must be a number',
    },
    toFloat: true,
    isFloat: {
      options: { min: 0 },
      errorMessage: 'Final Payment Amount Buyer must be a non-negative number',
    },
    exists: {
      errorMessage: 'Final Payment Amount Buyer is required',
    },
  },
  initialPaymentAmountFarmer: {
    in: ['body'],
    isFloat: {
      errorMessage: 'Initial Payment Amount Farmer must be a number',
    },
    toFloat: true,
    isFloat: {
      options: { min: 0 },
      errorMessage: 'Initial Payment Amount Farmer must be a non-negative number',
    },
    exists: {
      errorMessage: 'Initial Payment Amount Farmer is required',
    },
  },
  finalPaymentAmountFarmer: {
    in: ['body'],
    isFloat: {
      errorMessage: 'Final Payment Amount Farmer must be a number',
    },
    toFloat: true,
    isFloat: {
      options: { min: 0 },
      errorMessage: 'Final Payment Amount Farmer must be a non-negative number',
    },
    exists: {
      errorMessage: 'Final Payment Amount Farmer is required',
    },
  },
  productQuantityFarmer: {
    in: ['body'],
    isInt: {
      errorMessage: 'Product Quantity Farmer must be an integer',
    },
    toInt: true,
    isInt: {
      options: { min: 1 },
      errorMessage: 'Product Quantity Farmer must be a positive integer',
    },
    exists: {
      errorMessage: 'Product Quantity Farmer is required',
    },
  },
  lastUpdated:{
    in: ['body'],
    notEmpty: {
      errorMessage: "User type cannot be empty",
    },
    isIn: {
      options: [['Farmer', 'Buyer']],
      errorMessage: "Invalid user type",
    },
  }
});
