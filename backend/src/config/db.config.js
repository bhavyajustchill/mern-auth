require("dotenv").config();

const dbConfig = {
  connectionString: process.env.MONGODB_URL,
  portNo: process.env.PORT,
};

module.exports = dbConfig;
