import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';

function SliderComponent() {
  const [youtubers, setYoutubers] = useState([]);

  useEffect(() => {
    async function fetchYoutubers() {
      try {
        const response = await axios.get('/api/youtubers');
        setYoutubers(response.data);
      } catch (error) {
        console.error('Error fetching youtubers:', error);
      }
    }
    fetchYoutubers();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 9,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} style={{ marginTop: '5%' }}>
      {youtubers.map((item, index) => (
        <div key={index} className="image-container">
          <img src={item.img_url} alt={item.name} />
          <p>{item.name}</p>
        </div>
      ))}
    </Slider>
  );
}

export default SliderComponent;
