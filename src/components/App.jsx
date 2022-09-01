import { Component } from 'react';

import { Box } from './Box';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImagesApi from '../service-api/ImagesAPI';
import Loader from './Loader';
import { Button } from './ImageGallery/ImageGallery.styled';

import { GlobalStyle } from './GlobalStyle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  initialValues = {
    searchQuery: '',
    page: 1,
    per_page: 12,
    imagesData: [],
    total: null,
    totalHits: null,
    isLoading: false,
  };

  state = this.initialValues;

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.searchQuery !== this.state.searchQuery
    ) {
      this.setState({ isLoading: true });
      ImagesApi.getImages(
        this.state.searchQuery,
        this.state.page,
        this.state.per_page
      )
        .then(data => {
          this.setState(prevState => ({
            imagesData: [...prevState.imagesData, ...data.hits],
            totalHits: data.totalHits,
            total: data.total,
          }));

          if (this.state.page === 1) {
            toast.success(`Hooray! We found ${data.total} images`);
          }

          if (
            this.state.page !== 1 &&
            this.state.per_page * this.state.page >= this.state.totalHits
          ) {
            toast.info(` You've reached the end of search results`);
          }
          if (this.state.page !== 1) {
            setTimeout(this.softScroll, 200);
          }
        })
        .catch(err => toast.error(err))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  softScroll = () => {
    window.scrollBy({
      top: 828,
      behavior: 'smooth',
    });
  };

  onFormSubmit = ({ searchQuery }) => {
    if (searchQuery.trim() === '') {
      toast.warning('Enter search query');
      return;
    }
    if (searchQuery === this.state.searchQuery && this.state.page === 1) {
      return;
    }
    this.setState({
      ...this.initialValues,
      searchQuery,
    });
  };

  onLoadMoreHandler = () => {
    this.setState(({ page }) => {
      return { page: (page += 1) };
    });
  };

  render() {
    const { imagesData, totalHits, per_page, page, isLoading } = this.state;
    const loadMoreBtnStatus =
      !!imagesData?.length && per_page * page < totalHits; // перевірка, чи є на сервері ще не завантажені зображення

    return (
      <Box
        display="grid"
        gridTemplateColumns="1fr"
        gridGap="16px"
        paddingBottom="24px"
      >
        <Searchbar onFormSubmit={this.onFormSubmit} />
        <ImageGallery imagesData={imagesData} />

        {isLoading ? (
          <Loader />
        ) : (
          loadMoreBtnStatus && (
            <Button type="button" onClick={this.onLoadMoreHandler}>
              Load more
            </Button>
          )
        )}
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
      </Box>
    );
  }
}
