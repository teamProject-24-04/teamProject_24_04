'use client';

import React, { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import RootTheme from '../theme';
import Header from './header';
import SliderComponent from './SliderComponent';
import ButtonGroupComponent from './ButtonGroupComponent';
import RecipeListComponent from './RecipeListComponent';
import axios from 'axios';
import '.App.css';
import '../globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
