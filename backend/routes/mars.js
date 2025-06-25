const express = require('express');
const axios = require('axios');
const router = express.Router();



router.get('/', async (req, res) => {
  const { rover = 'curiosity', sol = 1000, camera } = req.query;
  try {
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`,
      {
params: {
  sol,
  api_key: NASA_API_KEY,
  ...(camera && { camera }), // Only include if camera is selected
},
      }
    );
    res.json(response.data.photos);
  } catch (error) {
    console.error('Error fetching Mars photos:', error);
    res.status(500).json({ error: 'Failed to fetch Mars Rover photos' });
  }
});

module.exports = router;
