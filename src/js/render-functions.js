import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../css/loader.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('span');

// Create the lightbox instance once; we refresh() it whenever new
// .gallery-link items are added instead of re-instantiating it.
const lightbox = new SimpleLightbox('.gallery-link', {
  captionSelector: 'img',
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const fragment = document.createDocumentFragment();

  images.forEach(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      // <li class="gallery-item">
      const galleryItem = document.createElement('li');
      galleryItem.classList.add('gallery-item');

      // <a class="gallery-link" href="largeImageURL">
      const galleryLink = document.createElement('a');
      galleryLink.classList.add('gallery-link');
      galleryLink.href = largeImageURL;

      // <img class="gallery-image" src="webformatURL" alt="tags" ...>
      const galleryImage = document.createElement('img');
      galleryImage.classList.add('gallery-image');
      galleryImage.src = webformatURL;
      galleryImage.alt = tags;
      galleryImage.width = 360;
      galleryImage.height = 152;

      const galleryContainer = document.createElement('div');
      galleryContainer.classList.add('gallery-container');

      // <ul class="gallery-item-list">
      const galleryItemList = document.createElement('ul');
      galleryItemList.classList.add('gallery-item-list');

      // <li class="gallery-item-list-item">
      const galleryItemListItem = document.createElement('li');
      galleryItemListItem.classList.add('gallery-item-list-item');

      // build the 4 stat blocks: label + value
      const stats = [
        { label: 'Likes', value: likes, className: 'title-likes' },
        { label: 'Views', value: views, className: 'title-views' },
        { label: 'Comments', value: comments, className: 'title-comments' },
        { label: 'Downloads', value: downloads, className: 'title-downloads' },
      ];

      stats.forEach(({ label, value, className }) => {
        const title = document.createElement('h2');
        title.classList.add('gallery-item-title', className);
        title.textContent = label;

        const info = document.createElement('p');
        info.classList.add('gallery-item-info');
        info.textContent = value;

        title.appendChild(info);
        galleryItemListItem.appendChild(title);
      });

      // assemble the item
      galleryItemList.appendChild(galleryItemListItem);

      galleryLink.appendChild(galleryImage);
      galleryItem.appendChild(galleryLink);
      galleryContainer.appendChild(galleryItemList);
      galleryItem.appendChild(galleryContainer);

      fragment.appendChild(galleryItem);
    }
  );

  gallery.appendChild(fragment);

  // New .gallery-link elements were just added to the DOM — refresh
  // (not re-create) the lightbox so it picks them up.
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('loader');
}

export function hideLoader() {
  loader.classList.remove('loader');
}
