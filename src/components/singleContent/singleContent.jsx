import React from 'react';
import { img_300, unavailable } from '../../config/config';
import './singleContent.css'
import Badge from '@mui/material/Badge';
import Model from '../Model/Model';

function SingleContent({ id, poster, title, date, media_type, vote_average }) {
  return (
    <Model media={media_type} id={id}>
          <Badge badgeContent={vote_average} color={vote_average>6?"primary":"secondary"} />
      <img className='poster' src={poster ? `${img_300}${poster}` : unavailable} alt={title} />
      <b className="title">{title}</b>
      <span className='sunTitle'>
        {media_type === 'tv' ? 'TV Series' : 'Movies'}
        <span className='sunTitle'>{date}</span>
      </span>
     </Model>
  );
}

export default SingleContent;
