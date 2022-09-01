import { ToastContainer, toast } from 'react-toastify';

import { Box } from './Box';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from './GlobalStyle';
import { useState } from 'react';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const onFormSubmit = ({ searchQuery: newSearchQuery }) => {
    if (newSearchQuery.trim() === '') {
      toast.warning('Enter search query');
      return;
    }
    newSearchQuery !== searchQuery && setSearchQuery(newSearchQuery);
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr"
      gridGap="16px"
      paddingBottom="24px"
    >
      <Searchbar onFormSubmit={onFormSubmit} />
      <ImageGallery searchQuery={searchQuery} />

      <GlobalStyle />
      <ToastContainer autoClose={2000} />
    </Box>
  );
};
