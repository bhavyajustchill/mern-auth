const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConfig = require("./config/db.config");

const authRoutes = require("./routes/auth.routes");

const corsOptions = {
  origin: true,
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

const { connectionString, portNo } = dbConfig;

attemptConnection()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB: " + err.message));

async function attemptConnection() {
  await mongoose.connect(connectionString);
}

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is Live!" });
});

app.listen(portNo, () => {
  console.log(`Server running on port ${portNo}`);
});
