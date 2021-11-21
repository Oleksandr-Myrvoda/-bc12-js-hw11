import './styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import debounce from 'lodash.debounce';

import './js/switch';
import imgCardTpl from './templates/imgCard.hbs';
import fetchImages from './js/apiService';
import smoothScroll from './js/smoothScroll';
import { refs } from './js/refs';
const { form, gallery } = refs;

let page = 1;
let queryImage = '';
let isLoading = false;
let shouldScroll = true;

const imagesMarkup = page => {
  gallery.insertAdjacentHTML('beforeend', imgCardTpl(page));
};

const loadGallery = () => {
  isLoading = true;
  fetchImages(queryImage, page)
    .then(images => {
      if (images.hits.length === 0) {
        shouldScroll = false;
        throw new Error(error);
      }
      if (page === 1) Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);

      imagesMarkup(images.hits);
      new SimpleLightbox('.gallery a');

      if (page > 1) smoothScroll();
      isLoading = false;
    })
    .catch(() => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      isLoading = false;
    });
};

const onSubmit = e => {
  e.preventDefault();

  queryImage = e.currentTarget.elements.searchQuery.value.trim();
  if (!queryImage) return;

  page = 1;
  gallery.innerHTML = '';
  shouldScroll = true;
  loadGallery();
};

const onLoadMore = () => {
  Notiflix.Notify.info('Loading more images...');
  page += 1;
  loadGallery();
};

// ======== infinite scroll ========

window.onscroll = debounce(() => {
  const ifWindowBottom =
    (window.innerHeight + window.pageYOffset) / document.body.offsetHeight >= 0.95;
  if (ifWindowBottom && shouldScroll) {
    onLoadMore('scroll', loadGallery);
  }
}, 250);

form.addEventListener('submit', onSubmit);
