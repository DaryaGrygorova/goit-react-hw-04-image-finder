import { MagnifyingGlass } from 'react-loader-spinner';
import { Box } from './Box';

const Loader = () => {
  return (
    <Box display="flex" justifyContent="center">
      <MagnifyingGlass
        visible={true}
        height="80px"
        width="80px"
        ariaLabel="MagnifyingGlass-loading"
        glassColor="#c0efff"
        color="#3f51b5"
      />
    </Box>
  );
};

export default Loader;
