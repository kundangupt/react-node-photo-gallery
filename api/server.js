const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { json } = require('body-parser');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(json());

const { parsed: config } = dotenv.config();

const BASE_URL = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}`;

const auth = {
  username: config.API_KEY,
  password: config.API_SECRET,
};

app.get('/photos', async (req, res) => {
  try {
    const response = await axios.get(BASE_URL + '/resources/image/url', {
      auth,
      params: {
        next_cursor: req.query.next_cursor,
      },
    });
    console.log(response.data);
    return res.send(response.data);
  } catch (error) {
    console.error('Error fetching photos:', error);
    return res.status(500).send('Internal Server Error');
  }
});

app.get('/search', async (req, res) => {
  try {
    const response = await axios.get(BASE_URL + '/resources/search', {
      auth,
      params: {
        expression: req.query.expression,
      },
    });
    console.log(response.data);
    return res.send(response.data);
  } catch (error) {
    console.error('Error searching photos:', error);
    return res.status(500).send('Internal Server Error');
  }
});

app.listen(7000, () => {
  console.log('Server is running on port 7000');
});
