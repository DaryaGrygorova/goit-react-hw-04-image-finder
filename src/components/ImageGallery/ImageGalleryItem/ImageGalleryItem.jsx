import { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal/index.js';

import { GalleryItem, ItemImage } from './ImageGalleryItem.styled.js';

const ImageGalleryItem = ({ item: { webformatURL, tags, largeImageURL } }) => {
  const [selectedImgURL, setSelectedImgURL] = useState('');

  const isSelectedToggle = () => {
    setSelectedImgURL(state => !state);
  };

  return (
    <GalleryItem>
      <ItemImage src={webformatURL} alt={tags} onClick={isSelectedToggle} />
      {!!selectedImgURL && (
        <Modal onClose={isSelectedToggle}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
}.isRequired;

export default ImageGalleryItem;
