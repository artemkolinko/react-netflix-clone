require('dotenv').config()
const app = require('./server');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');

const start = async () => {
  try {
    const conn = await mongoose.connect(process.env.ATLAS_URI);
    console.log(`MongoDB connected on host: ${conn.connection.host}`);
    
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`);
    });
  } catch (err) {
    console.error(`Error on server startup: ${err.message}`);
  }
};

start();