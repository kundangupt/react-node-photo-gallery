import React, { useState, useEffect } from 'react';
import { getImages, searchImages } from './api';
import './App.css';

const App = () => {
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const responseJson = await getImages();
    setImageList(responseJson.resources);
    setNextCursor(responseJson.next_cursor);
  };

  const handleLoadMoreButtonClick = async () => {
    const responseJson = await getImages(nextCursor);
    setImageList((currentImageList) => [
      ...currentImageList,
      ...responseJson.resources,
    ]);
    setNextCursor(responseJson.next_cursor);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    performSearch();
  };

  const performSearch = async () => {
    const responseJson = await searchImages(searchValue);
    setImageList(responseJson.resources);
    setNextCursor(responseJson.next_cursor);
  };

  const resetForm = () => {
    setSearchValue('');
    fetchData();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          required='required'
          placeholder='Enter a search value...'
        />
        <button type='submit'>Search</button>
        <button type='button' onClick={resetForm}>
          Clear
        </button>
      </form>
      <div className='image-grid'>
        {imageList.map((image) => (
          <img key={image.public_id} src={image.url} alt={image.public_id} />
        ))}
      </div>
      <div className='footer'>
        {nextCursor && (
          <button onClick={handleLoadMoreButtonClick}>Load More</button>
        )}
      </div>
    </>
  );
};

export default App;
