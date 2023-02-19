import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Movies.css';
import SingleContent from '../../components/singleContent/singleContent';
import CustomPagination from '../../components/pagination/pagination';
import CircularColor from '../../progress';

function Movies() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=d6b2d967f4c9acb5da0d6d4790fd60e5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    );
    setContent(data.results);
    setTotal(data.total_pages);
  };

  console.log(content.id)

  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [page]);
  return (
    <div>
      {loading ? (
        <div style={{display:"flex",width:"100%",justifyContent:"center",height:"50vh",alignItems:"center"}}>
          <CircularColor />
        </div>
      ) : (
        <>
          <span className="trendingPage">Movies</span>
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
                    media_type="movie"
                    vote_average={c.vote_average}
                  />
                );
              })}
          </div>
          {total > 1 && <CustomPagination total={total} setPage={setPage} />}
        </>
      )}
    </div>
  );
}

export default Movies;
