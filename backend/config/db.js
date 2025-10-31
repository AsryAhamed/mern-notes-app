const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Prevent multiple connections
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB already connected');
      return;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error; // Don't exit, let Vercel handle it
  }
};

module.exports = connectDB;