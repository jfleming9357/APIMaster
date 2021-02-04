const mongoose = require('mongoose');

const connectDB = async (db) => {
  try {
    const conn = await mongoose.connect(`mongodb://ec2-18-217-126-196.us-east-2.compute.amazonaws.com:27017/sdc_merged`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error.bind(console, 'MongoDB Connection Error>> : ');
  }
};

module.exports = connectDB;
