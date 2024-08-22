import { checkSchema } from "express-validator";

export const ChangePasswordSchema = checkSchema({
  oldpassword:{

    in: ['body'], // Specify that 'password' is expected in the request body
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isString: {
      errorMessage: "Password must be a string!",
    },
  },
  newpassword:{

    in: ['body'], // Specify that 'password' is expected in the request body
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isString: {
      errorMessage: "Password must be a string!",
    },
  },
  confirmpassword:{

    in: ['body'], // Specify that 'password' is expected in the request body
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isString: {
      errorMessage: "Password must be a string!",
    },
  }
})

