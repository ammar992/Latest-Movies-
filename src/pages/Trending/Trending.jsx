import React, { useEffect, useState } from 'react';
import './Trending.css';
import axios from 'axios';
import SingleContent from '../../components/singleContent/singleContent';
import CustomPagination from '../../components/pagination/pagination';
import { height, width } from '@mui/system';
import CircularColor from '../../progress';
function Trending() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [loading,setLoading] = useState(true);

  const fectchingData = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=d6b2d967f4c9acb5da0d6d4790fd60e5&page=${page}`
      );
      setContent(data.results);
    };
    useEffect(() => {
      fectchingData();
      setTimeout(()=>{
        setLoading(false)
      },3000)
    }, [page]);
    
  return (
    <div>
      {loading?<div style={{display:"flex",justifyContent:"center", width:"100%",alignItems:"center" ,height:"50vh"}}>
        <CircularColor />
      </div>
      :<>
      <span className="trendingPage">Trending</span>
      <div className="trneding">
        {content &&
          content.map((c) => {
            return (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={c.media_type}
                vote_average={c.vote_average}
              />
            );
          })}
      </div>
      <CustomPagination setPage={setPage} />
      </>}
    </div>
  );
}

export default Trending;
