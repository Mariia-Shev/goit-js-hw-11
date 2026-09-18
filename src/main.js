import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

export const form = document.querySelector('.form');
export const input = document.querySelector('.form input');
hideLoader();

form.addEventListener('submit', async event => {
  event.preventDefault();
  const searchInput = input.value.trim();

  if (!searchInput) {
    iziToast.show({
      title: 'ERROR',
      message: 'Please enter a search query.',
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const { hits } = await getImagesByQuery(searchInput);

    if (hits.length === 0) {
      iziToast.show({
        title: 'ERROR',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }

    createGallery(hits);
  } catch (error) {
    iziToast.show({
      title: 'ERROR',
      message: `${error}`,
    });
  } finally {
    hideLoader();
    form.reset();
  }
});
