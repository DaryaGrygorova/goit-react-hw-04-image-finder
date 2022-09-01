import { PropTypes } from 'prop-types';

import { BsSearch } from 'react-icons/bs';
import { Formik } from 'formik';

import {
  StyledSearchbar,
  StyledForm,
  Label,
  Input,
  Button,
} from './Searchbar.styled';

const Searchbar = ({ onFormSubmit }) => {
  const onSubmitHandle = value => {
    onFormSubmit(value);
  };

  return (
    <StyledSearchbar>
      <Formik initialValues={{ searchQuery: '' }} onSubmit={onSubmitHandle}>
        <StyledForm autoComplete="off">
          <Button type="submit">
            <BsSearch aria-label="Search" />
          </Button>

          <Label htmlFor="searchQuery" />

          <Input
            id="searchQuery"
            type="text"
            name="searchQuery"
            placeholder="Search images and photos"
            autoFocus
          />
        </StyledForm>
      </Formik>
    </StyledSearchbar>
  );
};

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}.isRequired;

export default Searchbar;
