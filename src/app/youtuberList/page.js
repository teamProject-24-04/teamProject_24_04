'use client';

import React, { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import { Container, ButtonGroup, Button } from '@mui/material';
import RootTheme from '../theme';
import Slider from 'react-slick';
import { MdLocalFireDepartment } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import './App.css';
import '../globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Header Component
function Header() {
  return (
    <div>
      <CiSearch style={{ marginLeft: 'auto', fontSize: '30px', marginTop: '20px' }} />
      <div style={{ marginTop: '5%', display: 'flex', alignItems: 'center' }}>
        <MdLocalFireDepartment
          style={{ marginRight: '5px', verticalAlign: 'bottom', fontSize: '24px', color: 'red' }}
        />
        <p>인기 유튜버 레시피</p>
      </div>
    </div>
  );
}

// Slider Component
function SliderComponent({ youtubers }) {
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

// Button Group Component
function ButtonGroupComponent({ isPressed1, isPressed2, handleButtonClick1, handleButtonClick2 }) {
  return (
    <div style={{ display: 'flex', width: '100%', marginTop: '5%' }}>
      <div style={{ width: '50%', flexGrow: 1 }}>
        <ButtonGroup disableElevation variant="contained" fullWidth>
          <Button
            style={{
              borderRadius: 0,
              backgroundColor: isPressed1 ? '#888' : '#fff',
              color: '#000',
              boxShadow: isPressed1 ? '2px 2px 5px rgba(0, 0, 0, 0.3)' : 'none',
              textAlign: 'left',
            }}
            onClick={handleButtonClick1}>
            <span style={{ fontSize: '110%', fontWeight: 'bold', lineHeight: '1.2', padding: '0' }}>
              인기 유튜버 레시피 <br />
              <span
                style={{ fontSize: '50%', fontWeight: 'bold', lineHeight: '1.2', padding: '0' }}>
                완벽한 바베큐를 위한 유튜버들의 레시피
              </span>
            </span>
          </Button>
        </ButtonGroup>
      </div>
      <div style={{ width: '50%', flexGrow: 1 }}>
        <ButtonGroup disableElevation variant="contained" fullWidth>
          <Button
            style={{
              borderRadius: 0,
              backgroundColor: isPressed2 ? '#888' : '#fff',
              color: '#000',
              boxShadow: isPressed2 ? '2px 2px 5px rgba(0, 0, 0, 0.3)' : 'none',
              textAlign: 'left',
            }}
            onClick={handleButtonClick2}>
            <span style={{ fontSize: '110%', fontWeight: 'bold', lineHeight: '1.2', padding: '0' }}>
              회원 바베큐 레시피 <br />
              <span
                style={{ fontSize: '50%', fontWeight: 'bold', lineHeight: '1.2', padding: '0' }}>
                완벽한 바베큐를 위한 회원들의 레시피
              </span>
            </span>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

// Recipe List Component
function RecipeListComponent({ youtubers, isPressed1 }) {
  return (
    <div className="youtuber_recipe" style={{ display: isPressed1 ? 'block' : 'none' }}>
      {youtubers.map((youtuber, index) => (
        <div key={index} className="recipe_list">
          <img src={youtuber.img_url} alt={youtuber.name} />
          <div className="recipe_info">
            <p>{youtuber.name}</p>
            <p>{youtuber.content_name}</p>
            <div className="views">
              <FaUser />
              <span>{youtuber.views}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Main App Component
function App() {
  const [isPressed1, setIsPressed1] = useState(true);
  const [isPressed2, setIsPressed2] = useState(false);
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

  const handleButtonClick1 = () => {
    setIsPressed1(true);
    setIsPressed2(false);
  };

  const handleButtonClick2 = () => {
    setIsPressed1(false);
    setIsPressed2(true);
  };

  return (
    <Container>
      <Header />
      <SliderComponent youtubers={youtubers} />
      <ButtonGroupComponent
        isPressed1={isPressed1}
        isPressed2={isPressed2}
        handleButtonClick1={handleButtonClick1}
        handleButtonClick2={handleButtonClick2}
      />
      <RecipeListComponent youtubers={youtubers} isPressed1={isPressed1} />
      {/* Render member recipes component */}
    </Container>
  );
}

// Theme App Component
export default function ThemeApp() {
  const theme = RootTheme();

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  );
}
