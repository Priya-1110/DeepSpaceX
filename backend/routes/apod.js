const express = require('express');
const axios = require('axios');
const router = express.Router();

const NASA_API_KEY = 'rG0wKaVCrIXySmsGr9S9QotDxUFByeZ91Du6F6gQ'; // Replace later with your actual key

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
