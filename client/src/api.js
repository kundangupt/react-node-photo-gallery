import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL;

export const getImages = async (nextCursor) => {
  try {
    const params = new URLSearchParams();

    if (nextCursor) {
      params.append('next_cursor', nextCursor);
    }

    const response = await axios.get(`https://api.cloudinary.com/v1_1/dzhgrubml/photos`, { params });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const searchImages = async (searchValue, nextCursor) => {
  try {
    const params = new URLSearchParams();
    params.append('expression', searchValue);

    if (nextCursor) {
      params.append('next_cursor', nextCursor);
    }

    const response = await axios.get(`https://api.cloudinary.com/v1_1/dzhgrubml/search`, { params });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error searching photos:', error);
    throw error;
  }
};
