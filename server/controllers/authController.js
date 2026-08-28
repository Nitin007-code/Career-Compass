const User = require("../models/User");

/*
 Register User :-
  Creates a new CareerCompass user.
 */
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) { 
    next(error);
  }
};

module.exports = {
  registerUser,
};