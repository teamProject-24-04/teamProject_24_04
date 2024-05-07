'use client';

import React, { useState } from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import RootTheme from '../theme';
import ButtonGroupComponent from './ButtonGroupComponent';
import Header from './Header';
import SliderComponent from './SliderComponent';
import RecipeListComponent from './RecipeListComponent';
import Detail from './Detail';
import './App.css';
import '../globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  const [isPressed1, setIsPressed1] = useState(true);
  const [isPressed2, setIsPressed2] = useState(false);

  const handleButtonClick1 = () => {
    setIsPressed1(true);
    setIsPressed2(false);
  };

  const handleButtonClick2 = () => {
    setIsPressed1(false);
    setIsPressed2(true);
  };

  const youtubers = [
    /* Define your youtubers array here */
  ];

  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/" exact>
            <Header /> {/* Header 컴포넌트를 Switch 컴포넌트 안으로 이동 */}
            <SliderComponent youtubers={youtubers} />
            <ButtonGroupComponent
              isPressed1={isPressed1}
              isPressed2={isPressed2}
              handleButtonClick1={handleButtonClick1}
              handleButtonClick2={handleButtonClick2}
            />
            <RecipeListComponent youtubers={youtubers} isPressed1={isPressed1} />
          </Route>
          <Route path="/detail/:id" render={(props) => <Detail {...props} hideHeader={true} />} />
        </Switch>
      </Container>
    </Router>
  );
}

export default function themeApp() {
  const theme = RootTheme();

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  );
}
