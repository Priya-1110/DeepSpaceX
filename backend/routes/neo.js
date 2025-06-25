const express = require('express');
const axios = require('axios');
const router = express.Router();



router.get('/', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];

  try {
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`
    );
    const neos = response.data.near_earth_objects[today];
    res.json(neos);
  } catch (error) {
    console.error('Error fetching NEO data:', error.message);
    res.status(500).json({ error: 'Failed to fetch Near Earth Objects' });
  }
});

module.exports = router;
