import PropTypes from 'prop-types';

import ImageGalleryItem from './ImageGalleryItem';

import { Gallery } from './ImageGallery.styled.js';

const ImageGallery = ({ imagesData }) => {
  return (
    <Gallery id="gallery">
      {!!imagesData?.length &&
        imagesData.map(item => <ImageGalleryItem key={item.id} item={item} />)}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  imagesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
}.isRequired;

export default ImageGallery;
