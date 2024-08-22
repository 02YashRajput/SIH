import { checkSchema } from 'express-validator';

export const signUpSchema = checkSchema({
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
  password: {
    in: ['body'], // Specify that 'password' is expected in the request body
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isString: {
      errorMessage: "Password must be a string!",
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
  }
});

export const loginSchema = checkSchema({
  email: {
    in: ['body'], // Specify that 'email' is expected in the request body
    optional: { options: { nullable: true } },
    isEmail: {
      errorMessage: "Please enter a valid email address",
    },
  },
  phone: {
    in: ['body'], // Specify that 'phone' is expected in the request body
    optional: { options: { nullable: true } },
    notEmpty: {
      errorMessage: "Phone number cannot be empty",
    },
    isMobilePhone: {
      options: 'en-IN', // Indian locale for mobile numbers
      errorMessage: "Please enter a valid Indian mobile number",
    },
  },
  password: {
    in: ['body'], // Specify that 'password' is expected in the request body
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isString: {
      errorMessage: "Password must be a string!",
    },
  },
}, {
  custom: {
    options: (value, { req }) => {
      if (!req.body.email && !req.body.mobile) {
        throw new Error("Either email or mobile number is required");
      }
      return true;
    },
  },
});
