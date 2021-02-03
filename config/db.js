const mongoose = require('mongoose');

const connectDB = async (db) => {
  try {
    const conn = await mongoose.connect(`mongodb://localhost:27018/sdc_merged`, {
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
