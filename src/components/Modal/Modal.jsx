import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

const { ModalOverlay, ModalBox } = require('./Modal.styled');

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.string.isRequired,
  }.isRequired;

  componentDidMount() {
    window.addEventListener('keydown', this.onKeydownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydownHandler);
  }

  onKeydownHandler = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onOverlayClickHandle = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <ModalOverlay onClick={this.onOverlayClickHandle}>
        <ModalBox>{this.props.children}</ModalBox>
      </ModalOverlay>,
      modalRoot
    );
  }
}

export default Modal;
