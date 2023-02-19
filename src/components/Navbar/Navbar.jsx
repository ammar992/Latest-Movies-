import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const nevigate = useNavigate();

  useEffect(() => {
    if (value === 0) {
      nevigate('/');
    } else if (value === 1) {
      nevigate('/movies');
    } else if (value === 2) {
      nevigate('/series');
    } else {
      nevigate('/search');
    }
  }, [value]);

  return (
    <div>
    <Box sx={{ width: '100%', position: 'fixed', bottom: '0', zIndex: 100,backgroundColor:"#000" }}>
      <BottomNavigation
        showLabels
        sx={{backgroundColor:"#39445a"}}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction style={{color:"#fff"}} label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction style={{color:"#fff"}} label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction style={{color:"#fff"}} label="TV Series" icon={<TvIcon />} />
        <BottomNavigationAction style={{color:"#fff"}} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
    </div>
  );
}
