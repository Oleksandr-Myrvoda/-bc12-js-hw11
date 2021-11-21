import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '20731872-71a610166f6b50a9cc8e22574';
const perPage = 40;

const fetchImages = async (search, page = 1) => {
  const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${search}&page=${page}&per_page=${perPage}&key=${API_KEY}&safesearch=true`;

  return await axios
    .get(url)
    .then(response => {
      if (response.status !== 200) throw new Error('Request was rejected');
      const images = response.data;

      return images;
    })
    .catch(err => console.log(err));
};

export default fetchImages;
