import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const { ModalOverlay, ModalBox } = require('./Modal.styled');

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const onKeydownHandler = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeydownHandler);

    return () => {
      window.removeEventListener('keydown', onKeydownHandler);
    };
  }, [onClose]);

  const onOverlayClickHandle = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <ModalOverlay onClick={onOverlayClickHandle}>
      <ModalBox>{children}</ModalBox>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.string.isRequired,
}.isRequired;

export default Modal;
