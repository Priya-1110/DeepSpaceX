const express = require('express');
const axios = require('axios');
const router = express.Router();

const NASA_API_KEY = 'YCZeX6qrrrkUBuKe1cjMlakie9etBTRzZ7WDetZx';

router.get('/', async (req, res) => {
  const mode = req.query.mode === 'enhanced' ? 'enhanced' : 'natural';
  const date = req.query.date; // optional: YYYY-MM-DD

  const url = date
    ? `https://api.nasa.gov/EPIC/api/${mode}/date/${date}?api_key=${NASA_API_KEY}`
    : `https://api.nasa.gov/EPIC/api/${mode}/images?api_key=${NASA_API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching EPIC ${mode} images:`, error.message);
    res.status(500).json({ error: `Failed to fetch EPIC ${mode} images` });
  }
});

module.exports = router;
