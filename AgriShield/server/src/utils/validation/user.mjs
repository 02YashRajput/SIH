export const signUpSchema ={
  email: {
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
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isString: {
      errorMessage: "Password must be a string!",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
  },
  name: {
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
    isString: {
      errorMessage: "Name must be a string!",
    },
  },
  phone: {
    notEmpty: {
      errorMessage: "Phone number cannot be empty",
    },
    isMobilePhone: {
      options: 'en-IN', 
      errorMessage: "Please enter a valid mobile number",
    },
  },
};

export const loginSchema = {
  email: {
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
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isString: {
      errorMessage: "Email must be a string!",
    },

  },
  
};