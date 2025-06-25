const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching EPIC images:', error.message);
    res.status(500).json({ error: 'Failed to fetch EPIC images' });
  }
});

module.exports = router;
