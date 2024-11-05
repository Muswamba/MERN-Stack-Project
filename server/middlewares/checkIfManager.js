const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkIfManager = async (req, res, next) => {
   // get token from header
   const token = req.header("Authorization");
   if (!token) {
      return res.status(401).json({
         success: false,
         message: "Unauthorized",
      });
   }

   try {
      // verification token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (req.user.role !== "manager") {
         // return error
         return res.status(401).json({
            success: false,
            message: "Access denied. Not a manager",
         });
      }
      req.user = await User.findById(decoded.id);
      // call next middleware
      next();
   } catch (error) {
      // handle error
      return res.status(401).json({
         success: false,
         message: "Something went wrong, from the server",
      });
   }
};

module.exports = checkIfManager;
