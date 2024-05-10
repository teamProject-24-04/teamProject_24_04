import React from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@mui/material';
import './App.css';
import '../globals.css';
import MyPage from './MyPage';
import MyPageModify from './MyPageModify';

function MainMy() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/" exact component={MyPage} />
          <Route path="/MyPageModify" component={MyPageModify} />
        </Switch>
      </Container>
    </Router>
  );
}

export default MainMy;
