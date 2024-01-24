import mongoose from 'mongoose';
import dotenv from "dotenv";


dotenv.config({ path: "../Server/util/config.env" });

const connectDB = async () => {
  try {
    // MongoDB setup.
    var dbConfig = {
        url: process.env.dbURL,
    };
    mongoose.connect(dbConfig.url, {
        'useNewUrlParser' : true,
        'useUnifiedTopology' : true
    });
    console.log("Successfully connected to the database");
  } catch (e) {
    console.error(e.message);
    console.log(
      '%s MongoDB connection error. Please make sure MongoDB is running.',
    );
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;