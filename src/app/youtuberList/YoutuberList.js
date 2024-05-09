'use client';

import React, { useState } from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@mui/material';
import ButtonGroupComponent from './ButtonGroupComponent';
import Header from './Header';
import SliderComponent from './SliderComponent';
import RecipeListComponent from './RecipeListComponent';
import YoutubersDetail from './YoutubersDetail';
import MembersDetail from './MembersDetail';
import './App.css';
import '../globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function YoutuberList() {
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

  const members = [
    /* Define your youtubers array here */
  ];

  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/" exact>
            <Header />
            <SliderComponent youtubers={youtubers} />
            <ButtonGroupComponent
              isPressed1={isPressed1}
              isPressed2={isPressed2}
              handleButtonClick1={handleButtonClick1}
              handleButtonClick2={handleButtonClick2}
            />
            {isPressed1 && <RecipeListComponent youtubers={youtubers} isPressed1={isPressed1} />}
            {isPressed2 && <RecipeListComponent members={members} isPressed1={isPressed1} />}
          </Route>
          <Route
            path="/YoutubersDetail/:id"
            render={(props) => <YoutubersDetail {...props} hideHeader={true} />}
          />
          <Route
            path="/MembersDetail/:id"
            render={(props) => <MembersDetail {...props} hideHeader={true} />}
          />
        </Switch>
      </Container>
    </Router>
  );
}

export default YoutuberList;
