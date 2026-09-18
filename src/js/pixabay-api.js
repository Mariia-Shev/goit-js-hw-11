import axios from 'axios';

export const API_KEY = '57632627-1deee9d118fde0cb5a37cdfe4';
export const BASE_URL = 'https://pixabay.com/api/';

// /**
//  * Fetches images from Pixabay matching the given query.
//  * @param {string} query - the user's search text
//  * @returns {Promise<Object>} the Pixabay API response data (contains `hits`, `total`, `totalHits`)
//  */
export async function getImagesByQuery(query) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });

  return response.data;
}
