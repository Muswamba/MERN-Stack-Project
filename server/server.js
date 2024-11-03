const app = require("./app");

// set the port
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
