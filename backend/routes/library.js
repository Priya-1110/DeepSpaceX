const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const { q = 'space', media_type = 'image,video,audio', year_start, year_end } = req.query;

  try {
    const response = await axios.get('https://images-api.nasa.gov/search', {
      params: {
        q,
        media_type,
        year_start,
        year_end,
      },
    });

    res.json(response.data.collection.items);
  } catch (error) {
    console.error('Error fetching NASA library:', error.message);
    res.status(500).json({ error: 'Failed to fetch NASA media library' });
  }
});

module.exports = router;
