import { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal/index.js';

import { GalleryItem, ItemImage } from './ImageGalleryItem.styled.js';

class ImageGalleryItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }).isRequired,
  }.isRequired;

  state = {
    isSelected: '',
  };

  isSelectedToggle = () => {
    this.setState(({ isSelected }) => ({ isSelected: !isSelected }));
  };

  render() {
    const { isSelected } = this.state;
    const { item } = this.props;

    return (
      <GalleryItem>
        <ItemImage
          src={item.webformatURL}
          alt={item.tags}
          onClick={this.isSelectedToggle}
        />
        {isSelected && (
          <Modal onClose={this.isSelectedToggle}>
            <img src={item.largeImageURL} alt={item.tags} />
          </Modal>
        )}
      </GalleryItem>
    );
  }
}

export default ImageGalleryItem;
