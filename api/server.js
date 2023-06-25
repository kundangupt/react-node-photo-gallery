const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const axios = require('axios');

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(json());

const BASE_URL = 'https://api.cloudinary.com/v1_1/dzhgrubml'; // Replace 'your_cloud_name' with your Cloudinary cloud name

const auth = {
  username: '525699621141772', // Replace 'your_api_key' with your Cloudinary API key
  password: 'pIEeSKolQ_av6Qb7n4pfucwF_TA', // Replace 'your_api_secret' with your Cloudinary API secret
};

app.get('/photos', async (req, res) => {
  try {
    const { next_cursor } = req.query;

    const response = await axios.get(`${BASE_URL}/resources/image`, {
      auth,
      params: {
        next_cursor,
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
    const { expression } = req.query;

    const response = await axios.get(`${BASE_URL}/resources/search`, {
      auth,
      params: {
        expression,
      },
    });

    console.log(response.data);
    return res.send(response.data);
  } catch (error) {
    console.error('Error searching photos:', error);
    return res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
