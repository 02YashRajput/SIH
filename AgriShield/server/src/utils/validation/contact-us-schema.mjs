import { checkSchema } from 'express-validator';


export const ContactUsSchema = checkSchema({
  email: {
    in: ['body'], // Specify that 'email' is expected in the request body
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
  name: {
    in: ['body'], // Specify that 'name' is expected in the request body
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
    isString: {
      errorMessage: "Name must be a string!",
    },
  },
  phone: {
    in: ['body'], // Specify that 'phone' is expected in the request body
    notEmpty: {
      errorMessage: "Phone number cannot be empty",
    },
    isMobilePhone: {
      options: 'en-IN', // Indian locale for mobile numbers
      errorMessage: "Please enter a valid Indian mobile number",
    },
  },
  userType: {
    in: ['body'], // Specify that 'userType' is expected in the request body
    notEmpty: {
      errorMessage: "User type cannot be empty",
    },
    isIn: {
      options: [['Farmer', 'Buyer', 'Admin']],
      errorMessage: "Invalid user type",
    },
  },
  msg:{
    in:['body'],
    notEmpty: {
      errorMessage: "Message cannot be empty",
    },
    isString: {
      errorMessage: "Message must be a string!",
    },
  }
});