import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Loader from '../Loader';
import ImageGalleryItem from './ImageGalleryItem';
import ImagesApi from '../../service-api/ImagesAPI';

import 'react-toastify/dist/ReactToastify.css';
import { Gallery, Button } from './ImageGallery.styled.js';
import React, { useEffect, useState } from 'react';

const ImageGallery = ({ searchQuery }) => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEndOfList, setIsEndOfList] = useState(true);
  const per_page = 12;

  // !!images?.length && per_page * page < totalHits; // перевірка, чи є на сервері ще не завантажені зображення

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const data = await ImagesApi.getImages(searchQuery, page, per_page);
        if (page === 1) {
          setImages([...data.hits]);
          setTotalHits(data.totalHits);
          toast.success(`Hooray! We found ${data.total} images`);
        } else {
          setImages(state => [...state, ...data.hits]);
          setTimeout(softScroll, 200);
        }
      } catch (err) {
        toast.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery.trim() !== '') {
      setIsLoading(true);
      getImages();
    }
  }, [page, per_page, searchQuery]);

  useEffect(() => {
    if (!!images?.length) {
      setIsEndOfList(page * per_page >= totalHits);
    }
  }, [images?.length, page, per_page, totalHits]);

  useEffect(() => {
    if (page !== 1 && isEndOfList) {
      toast.info(` You've reached the end of search results`);
    }
  }, [isEndOfList, page]);

  const softScroll = () => {
    window.scrollBy({
      top: 552,
      behavior: 'smooth',
    });
  };

  const onLoadMoreHandler = () => {
    setPage(page => (page += 1));
  };

  return (
    <React.Fragment>
      <Gallery id="gallery">
        {!!images?.length &&
          images.map(item => <ImageGalleryItem key={item.id} item={item} />)}
      </Gallery>

      {isLoading ? (
        <Loader />
      ) : (
        !isEndOfList && (
          <Button type="button" onClick={onLoadMoreHandler}>
            Load more
          </Button>
        )
      )}
    </React.Fragment>
  );
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
}.isRequired;

export default ImageGallery;
