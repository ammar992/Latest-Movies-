import React from 'react';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider } from 'styled-components';
import { createTheme } from '@mui/material/styles';
import blue from '@mui/material/colors/blue';
import { Typography } from '@mui/material';


function CustomPagination({ setPage,total=10 }) {
  const handlePage = (e) => {
    setPage(e.target.textContent);
    window.scroll(0, 0);
  };

  const theme = createTheme({
    palette: {
      type: "dark"
    },
  });


  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={theme}>
        <Pagination   onChange={handlePage} color="primary" count={total} hideNextButton hidePrevButton />
        </ThemeProvider>
    </div>
  );
}

export default CustomPagination;
