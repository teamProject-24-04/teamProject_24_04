import React from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@mui/material';
import MyPage from './MyPage';
import MyPageModify from './MyPageModify';

function MainMy() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/" exact>
            <MyPage />
          </Route>
          <Route>
            <MyPageModify />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default MainMy;
