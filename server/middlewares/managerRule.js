module.exports = (req, res, next) => {
   // list of authorized emails
   const authorizedEmails = [
      "yQkqz@example.com",
      "yQkqz@example.com",
      "yQkqz@example.com",
      "yQkqz@example.com",
   ];

   // list verification codes
   const authorizedCodes = ["839393", "838293", "88933", "828292"];
   // check if the email is authorized and the code is correct
   if (!authorizedEmails.includes(req.body.email)) {
      return res.status(400).json({
         success: false,
         message: "You are not authorized",
      });
   }

   // check if the code is correct
   if (authorizedCodes.includes(req.body.code)) {
      next();
   } else {
      return res.status(400).json({
         success: false,
         message: "Invalid code",
      });
   }
};
