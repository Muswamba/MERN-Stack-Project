const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
   // Get the token from the header
   const authHeader = req.header("Authorization");

   if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
         success: false,
         message: "Access denied. No token provided.",
      });
   }

   // Remove the "Bearer " prefix from the token string
   const token = authHeader.split(" ")[1];

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
   } catch (error) {
      return res.status(401).json({
         success: false,
         message: "Invalid token.",
      });
   }
};

module.exports = authenticate;
