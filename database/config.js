const mongoose = require("mongoose");

/**
 * Database connection
 *
 * If all goes well print Online Database, else print an error
 *
 */
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Online database");
  } catch (err) {
    console.log(err);
    throw new Error("Database connection error");
  }
};

module.exports = {
  dbConnection,
};
