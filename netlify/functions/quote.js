const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../.env')});
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const serverless = require('serverless-http');



const app = express();
const router = express.Router();

app.use(cors());
// Quote route
router.get('/api/quote', async (req, res) => {
  const apiKey = process.env.API_KEY;
  const apiUrl = 'https://api.api-ninjas.com/v1/quotes';
  console.log(`Fetching quote from: ${apiUrl}`);
  console.log(`Using API Key: ${apiKey? apiKey : 'Not provided'}`);
  try {
    const response = await fetch(apiUrl, {
      headers: { 'X-Api-Key': apiKey }
    });

    if (!response.ok) {
      console.log(`Response status: ${response.state} ${response.statusText}]`);
      throw new Error(`API returned an error: ${response.status} ${response.statusText}`);
    }
    console.log(`Response status: ${response.status} ${response.statusText}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

// Mount router under /.netlify/functions/server
app.use('/', router);

// Local dev server (optional)
if (process.env.NODE_ENV !== 'production') {
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
  });
}

module.exports.handler = serverless(app);
;