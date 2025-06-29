const express = require('express');
const axios = require('axios');
const router = express.Router();

NASA_API_KEY = 'YCZeX6qrrrkUBuKe1cjMlakie9etBTRzZ7WDetZx'

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching APOD:', error);
    res.status(500).json({ error: 'Failed to fetch APOD' });
  }
});

module.exports = router;
