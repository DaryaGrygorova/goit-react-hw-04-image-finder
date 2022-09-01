import axios from 'axios';
import { Component } from 'react';

class ImagesApiService extends Component {

  async getImages(searchQuery, page = 1, per_page = 40 ) {
    const URL_ORIGIN = 'https://pixabay.com/api/';

    const searchParam = new URLSearchParams({
      key: '28168095-f0304d55a0b5c15c6597d0047',
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page,
      per_page,
    });

    return axios
      .get(`${URL_ORIGIN}?${searchParam}`)
      .then(response => {
        if (response.status !== 200) {
          return Promise.reject(`Error: ${response.message}`);
        }

        if (response.data.totalHits === 0) {
          return Promise.reject(
            'Sorry, no matches found. Please try again.'
          );
        }
        return response.data;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }
};
const ImagesApi = new ImagesApiService();

export default ImagesApi;
