import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_zCoea0Cwz3217vXOTRF8cNZklxYUAHGIqaWVkhc9taUzX5Dm0eWolxV6LibBZl06';

const select = document.getElementsByClassName('breed-select')[0];
const error = document.getElementsByClassName('error')[0];

function fetchBreeds() {
  select.style.display = 'none';
  error.style.display = 'none';
  return axios.get('/breeds').then(response => {
    return response.data;
  });
}

function fetchCatByBreed(id) {
  return axios
    .get(
      `/images/search?breed_ids=${id}&api_key=live_zCoea0Cwz3217vXOTRF8cNZklxYUAHGIqaWVkhc9taUzX5Dm0eWolxV6LibBZl06`
    )
    .then(response => {
      return response.data;
    });
}

export { fetchBreeds, fetchCatByBreed };
