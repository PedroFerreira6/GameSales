const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5002;

app.use(express.json());
app.use(cors());

app.get('/getGameDetails/:gameId', async (req, res) => {
  const gameId = req.params.gameId;
  try {
    const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${gameId}`);
    
    // Check if the response contains data for the specified game ID
    if (response.data && response.data[gameId] && response.data[gameId].success) {
      // Send the game details as JSON response
      res.json(response.data[gameId].data);
    } else {
      // If the response doesn't contain data for the specified game ID, send a 404 status code
      res.status(404).json({ error: 'Game details not found' });
    }
  } catch (error) {
    // If there's an error fetching data from the Steam API, send a 500 status code
    res.status(500).json({ error: 'Failed to fetch data from Steam API' });
  }
});


app.get('/jogosemsaldo', async (req, res) => {
  try {
    const response = await axios.get('https://store.steampowered.com/api/featuredcategories/?l=portuguese');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Steam API' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});