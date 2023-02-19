import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './series.css';
import SingleContent from '../../components/singleContent/singleContent';
import CustomPagination from '../../components/pagination/pagination';

function Series() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const fetchData =async () => {
    const { data } =await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=d6b2d967f4c9acb5da0d6d4790fd60e5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    );
    setContent(data.results);
    setTotal(data.total_pages)
  };
  useEffect(() => {
    fetchData();
  }, [page]);
  return (
    <div>
      <span className="trendingPage">Tv series</span>
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
              media_type="tv"
              vote_average={c.vote_average}
            />
          );
        })}
    </div>
    {
      total>1 && <CustomPagination total={total}  setPage={setPage} /> 
    }
    </div>
  );
}

export default Series;
