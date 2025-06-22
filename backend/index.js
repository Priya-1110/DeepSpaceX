const express = require('express');
const cors = require('cors');
const app = express();
const apodRoute = require('./routes/apod');
const marsRoute = require('./routes/mars');
const epicRoute = require('./routes/epic');
const neoRoute = require('./routes/neo');



app.use(cors());
app.use('/api/apod', apodRoute);
app.use(express.json());
app.use('/api/mars', marsRoute);
app.use('/api/epic', epicRoute);
app.use('/api/neo', neoRoute);
app.get('/', (req, res) => {
  res.send('🚀 NASA Backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
