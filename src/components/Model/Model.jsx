import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { img_500, unavailable } from '../../config/config';
import './modal.css';
import Carousel from '../../components/carousel/carosel'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  backgroundColor: "#39445a",
  border: "1px solid #282c34",
  borderRadius: 5,
  color: "white",
  p: 4,
};

export default function Model({ children, media, id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const fecthData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media}/${id}?api_key=d6b2d967f4c9acb5da0d6d4790fd60e5&language=en-US`
    );
    setContent(data);
  };


  console.log(media);
  const fecthVideos = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=d6b2d967f4c9acb5da0d6d4790fd60e5&language=en-US`
    );
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fecthData();
    fecthVideos();
  }, []);


  return (
    <div>
      <div className="media" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={style}>
          {content && (
            <div>
              <div className="model">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt="img"
                  className='content_portrate'
                />
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailable
                  }
                  alt="img"
                  className='content_landscape'
                />
                <div className='content_about'>
                  <span className='content_title'>
                    {content.name||content.title}({
                      (content.first_air_date || content.release_date||"------").substring(0,4)
                    })
                  </span>
                  <span>
                  {content.tagline && (
                    <i className='tagline'>{content.tagline}</i>
                  )}
                  </span>
                  <span className='description'>{
                    content.overview
                    }</span>
                    <div>
                      <Carousel  media={media} id={id}/>
                    </div>
                    <div style={{marginTop:"40px"}}>
                      <Button variant="contained"
                      color="primary"
                      target="_blank"
                      href={`https://www.youtube.com/watch?v=${video}`}
                      >
                        Watch the trailer
                      </Button>
                    </div>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
