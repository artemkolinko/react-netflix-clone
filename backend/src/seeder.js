/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios').default;
const Show = require('./models/Show');

const showsQuantity = 100;

const seeder = async () => {
  try {
    // connect to mongoDB Atlas
    const conn = await mongoose.connect(process.env.ATLAS_URI);
    console.log(`MongoDB connected on host: ${conn.connection.host}`);

    // Get shows from API
    const response = await axios.get('https://api.tvmaze.com/shows');
    const chank = response.data.slice(0, showsQuantity);
    const chankMin = chank.map(
      ({id, name, image, url, summary, rating, genres}) => ({
        id,
        name,
        image,
        url,
        summary,
        rating,
        genres,
        likes: [],
      }),
    );

    await Show.deleteMany();
    await Show.insertMany(chankMin);

    console.log(`${chankMin.length} shows was imported!`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seeder();
