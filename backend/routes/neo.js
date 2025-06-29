const express = require('express');
const axios = require('axios');
const router = express.Router();

const NASA_API_KEY = 'YCZeX6qrrrkUBuKe1cjMlakie9etBTRzZ7WDetZx';

router.get('/', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];

  try {
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`
    );

    let neos = response.data.near_earth_objects[today];

    // 🧼 Filter out NEOs missing important data
    neos = neos.filter(neo =>
      neo.estimated_diameter?.kilometers?.estimated_diameter_max &&
      neo.close_approach_data?.length > 0 &&
      neo.close_approach_data[0]?.relative_velocity?.kilometers_per_hour &&
      neo.close_approach_data[0]?.miss_distance?.kilometers
    );

    res.json(neos);
  } catch (error) {
    console.error('Error fetching NEO data:', error.message);
    res.status(500).json({ error: 'Failed to fetch Near Earth Objects' });
  }
});

module.exports = router;
