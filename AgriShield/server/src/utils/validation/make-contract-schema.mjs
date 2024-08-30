import { checkSchema } from 'express-validator';

export const ActivateContractValidationSchema = checkSchema({
  productName: {
    in: ['body'],
    notEmpty: {
      errorMessage: "Product Name cannot be empty",
    },
    isString: {
      errorMessage: "Product Name must be a string",
    },
    isIn: {
      options: [["arhar", "bajra", "barley", "copra", "cotton", "gram", "groundnut", "jowar", "jute", "maize", "masoor", "moong", "niger", "paddy", "ragi", "rape", "safflower", "sesamum", "soyabean", "sugarcane", "sunflower", "urad", "wheat"]],
      errorMessage: "Invalid Product Name",
    },
  },
  initialPaymentAmount: {
    in: ['body'],
    notEmpty: {
      errorMessage: "Initial Payment Amount cannot be empty",
    },
    isNumeric: {
      errorMessage: "Initial Payment Amount must be a number",
    },
    isInt: {
      options: { min: 1 },
      errorMessage: "Initial Payment Amount must be at least 1",
    },
  },
  finalPaymentAmount: {
    in: ['body'],
    notEmpty: {
      errorMessage: "Final Payment Amount cannot be empty",
    },
    isNumeric: {
      errorMessage: "Final Payment Amount must be a number",
    },
    isInt: {
      options: { min: 1 },
      errorMessage: "Final Payment Amount must be at least 1",
    },
  },
  duration: {
    in: ['body'],
    notEmpty: {
      errorMessage: "Duration cannot be empty",
    },
    isNumeric: {
      errorMessage: "Duration must be a number",
    },
    isInt: {
      options: { min: 1 },
      errorMessage: "Duration must be at least 1",
    },
  },
  productQuantity: {
    in: ['body'],
    notEmpty: {
      errorMessage: "Product Quantity cannot be empty",
    },
    isNumeric: {
      errorMessage: "Product Quantity must be a number",
    },
    isInt: {
      options: { min: 1 },
      errorMessage: "Product Quantity must be at least 1",
    },
  },
  productDescription: {
    in: ['body'],
    optional:true,
    notEmpty: {
      errorMessage: "Product Description cannot be empty",
    },
    isString: {
      errorMessage: "Product Description must be a string",
    },
  },
  'location.latitude': {
    in: ['body'],
    optional:true,
    notEmpty: {
      errorMessage: "Latitude cannot be empty",
    },
    isFloat: {
      options: { min: -90, max: 90 },
      errorMessage: "Latitude must be a number between -90 and 90",
    },
  },
  'location.longitude': {
    in: ['body'],
    optional:true,
    notEmpty: {
      errorMessage: "Longitude cannot be empty",
    },
    isFloat: {
      options: { min: -180, max: 180 },
      errorMessage: "Longitude must be a number between -180 and 180",
    },
  },
  BuyerName: {
    in: ['body'],
    notEmpty: {
      errorMessage: "Buyer Name cannot be empty",
    },
    isString: {
      errorMessage: "Buyer Name must be a string",
    },
  },

});
