const express = require('express');
const axios = require('axios');
const router = express.Router();

NASA_API_KEY = 'YCZeX6qrrrkUBuKe1cjMlakie9etBTRzZ7WDetZx'

router.get('/', async (req, res) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // Last 7 days

    const formattedStart = startDate.toISOString().split('T')[0];

    const response = await axios.get(`https://api.nasa.gov/DONKI/notifications`, {
      params: {
        startDate: formattedStart,
        type: 'all',
        api_key: NASA_API_KEY,
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error('Error fetching DONKI data:', err.message);
    res.status(500).json({ error: 'Failed to fetch space weather alerts' });
  }
});

module.exports = router;
