const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const managerController = {
   validateRegister: [
      check("name").not().isEmpty().withMessage("Name is required"),
      check("email").not().isEmpty().withMessage("Email is required"),
      check("email").isEmail().withMessage("Email is invalid"),

      check("password").not().isEmpty().withMessage("Password is required"),
      check("password")
         .isLength({ min: 6 })
         .withMessage("Password must be at least 6 characters"),
      check("role").not().isEmpty().withMessage("Role is required"),
   ],
   validateLogin: [
      check("email").not().isEmpty().withMessage("Email is required"),
      check("email").isEmail().withMessage("Email is invalid"),
      check("password").not().isEmpty().withMessage("Password is required"),
   ],
   // login
   login: async (req, res) => {
      const { email, password } = req.body;

      if (!email || !password) {
         return res.status(400).json({
            success: false,
            message: "Please provide all fields",
         });
      }

      try {
         // check if the user exists
         const existingUser = await User.findOne({ email });
         if (!existingUser) {
            return res.status(400).json({
               success: false,
               message: "User does not exist from manager controller",
            });
         }

         // check if the password is correct
         const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
         );
         if (!isPasswordCorrect) {
            return res.status(401).json({
               success: false,
               message: "Invalid credentials",
            });
         }

         // generate token
         const token = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "600h" }
         );

         res.status(200).json({
            success: true,
            user: {
               id: existingUser._id,
               name: existingUser.name,
               email: existingUser.email,
               role: existingUser.role,
            },
            token,
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            success: false,
            message: "Internal server error",
         });
      }
   },

   // register
   register: async (req, res) => {
      const { name, email, role, password } = req.body;
      if (!name || !email || !role || !password) {
         return res.status(400).json({
            success: false,
            message: "Please provide all fields",
         });
      }

      try {
         const existingUser = await User.findOne({ email });
         if (existingUser) {
            return res.status(400).json({
               success: false,
               message: "User already exists",
            });
         }

         // hash the password
         const hashedPassword = await bcrypt.hash(password, 10);
         const newUser = new User({
            name,
            email,
            role,
            password: hashedPassword,
         });
         await newUser.save();

         res.status(200).json({
            success: true,
            user: {
               id: newUser._id,
               name: newUser.name,
               email: newUser.email,
               role: newUser.role,
            },
         });
      } catch (error) {
         console.log(error);
         res.status(500).json({
            success: false,
            message: "Internal server error",
         });
      }
   },
};

module.exports = managerController;
