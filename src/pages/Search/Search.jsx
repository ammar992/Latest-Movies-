import { Button, Tab, Tabs, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './search.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import SingleContent from '../../components/singleContent/singleContent';
import CustomPagination from '../../components/pagination/pagination';

function Search() {
  const theme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#fff',
      },
    },
  });

  const [type, setType] = useState(0);
  const [content, setCotent] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();


  
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          type ? 'tv' : 'movie'
        }?api_key=d6b2d967f4c9acb5da0d6d4790fd60e5&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setCotent(data.results);
      setTotal(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(content);

  useEffect(() => {
    window.scroll(0, 0);
    fetchData();
  }, [page, type, searchText]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <div
          style={{ display: 'flex', alignItems: 'center', padding: '0 5px' }}
        >
          <TextField
            sx={{
              backgroundColor: '#808B96',
              color: '#34495E',
              input: { color: 'white' },
            }}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            InputLabelProps={{ className: 'textfiled__label' }}
          />
          <Button onClick={fetchData}>
            <SearchIcon
              sx={{
                color: '#000000',
                backgroundColor: '#ffffff',
                fontSize: '53px',
                padding: '5px 10px',
                marginLeft: '-5px',
              }}
            />
          </Button>
        </div>
      </ThemeProvider>
      <div style={{ width: '100%' }}>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="success"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          className="tab"
          style={{ paddingBottom: 5, display: 'flex' }}
        >
          <Tab style={{ flex: 1 }} label="Search Movie Series" />
          <Tab style={{ flex: 1 }} label="Search Tv Series" />
        </Tabs>
      </div>
      <>
        <div className="trneding">
          {content &&
            content.map((c) => {
              return (
                <SingleContent
                  id={c.id}
                  key={c.id}
                  poster={c.poster_path}
                  title={c.title || c.name}
                  date={c.first_air_date || c.release_date}
                  media_type={type?"tv":"movie"}
                  vote_average={c.vote_average}
                />
              );
            })}

          {searchText &&
            content.length===0 &&
            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
        </div>

        {total > 1 && <CustomPagination total={total} setPage={setPage} />}
      </>
    </>
  );
}

export default Search;
