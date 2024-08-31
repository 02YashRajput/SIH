import { checkSchema } from 'express-validator';

export const ContractValidationSchema = checkSchema({
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

  },
  productQuantity: {
    in: ['body'],
    notEmpty: {
      errorMessage: "Product Quantity cannot be empty",
    },
    isNumeric: {
      errorMessage: "Product Quantity must be a number",
    },

  },
  productDescription: {
    in: ['body'],
    notEmpty: {
      errorMessage: "Product Description cannot be empty",
    },
    isString: {
      errorMessage: "Product Description must be a string",
    },
  },
  'location.latitude': {
    in: ['body'],
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
    notEmpty: {
      errorMessage: "Longitude cannot be empty",
    },
    isFloat: {
      options: { min: -180, max: 180 },
      errorMessage: "Longitude must be a number between -180 and 180",
    },
  },
});
