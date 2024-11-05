const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Store = require("../models/Store");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authController = {
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
   register: async (req, res) => {
      // check if the fields are empty
      const { name, email, role, password, storeName, description, logo } =
         req.body;

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
         if (role === "seller") {
            // store name is required
            if (!storeName) {
               return res.status(400).json({
                  success: false,
                  message: "Store name is required",
               });
            }
            // description is required
            if (!description) {
               return res.status(400).json({
                  success: false,
                  message: "Description is required",
               });
            }
            const newUser = new User({
               name,
               email,
               role,
               password: hashedPassword,
            });
            await newUser.save();

            // create store
            const store = new Store({
               storeName: storeName,
               seller: newUser._id,
               logo: "",
               description: description,
            });
            await store.save();

            return res.status(201).json({
               success: true,
               message: "User created successfully",
            });
         }

         const newUser = new User({
            name,
            email,
            role,
            password: hashedPassword,
         });
         await newUser.save();

         // create store
         const store = new Store({
            storeName: storeName,
            seller: newUser._id,
            logo: "",
            description: description,
         });
         await store.save();

         return res.status(201).json({
            success: true,
            message: "User created successfully",
         });
      } catch (error) {
         // handle errors
         return res.status(500).json({
            success: false,
            message: "Internal server error",
         });
      }
   },
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
               message: "User does not exist",
            });
         }

         //    check if the password is correct
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
         // create a token
         const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role },
            process.env.JWT_SECRET,
            {
               expiresIn: "600h",
            }
         );

         return res.status(200).json({
            user: {
               id: existingUser._id,
               name: existingUser.name,
               email: existingUser.email,
               role: existingUser.role,
            },
            token: token,
         });
      } catch (error) {
         // handle errors
         return res.status(500).json({
            success: false,
            message: "Internal server error",
         });
      }
   },
};

module.exports = authController;
