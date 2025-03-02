const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectdb.js");
const userRoutes = require("./routes/userRoute.js");
const path = require("path");
dotenv.config();

// Connect to Database
connectDb();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/users", require("./routes/userRoute.js"));

app.use("/api/v1/transactions", require("./routes/transactionRoutes.js"));

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.green.bold);
});
