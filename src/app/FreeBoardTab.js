import React from 'react';
import { MemoryRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import { Container } from '@mui/material';
import FreeArticleList from './free/List/freeArticleList';
import FreeDetail from './free/detail/freeDetail';
import FreeWrite from './free/write/freeWrite';
import FreeModify from './free/modify/freeModify';
import SearchPage from './search/searchPage';

export default function FreeboardTab({ noticeSnackBarStatus }) {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/" exact>
            <FreeArticleList />
          </Route>
          <Route
            path="/free/write"
            render={(props) => <FreeWrite {...props} noticeSnackBarStatus={noticeSnackBarStatus} />}
          />
          <Route
            path="/freedetail/:id"
            render={(props) => (
              <FreeDetail {...props} noticeSnackBarStatus={noticeSnackBarStatus} />
            )}
          />
          <Route
            path="/free/modify/:id"
            render={(props) => (
              <FreeModify {...props} noticeSnackBarStatus={noticeSnackBarStatus} />
            )}
          />
          {/* <Route path="/free/modify/:id" component={FreeModify} /> */}
          <Route path="/search" component={SearchPage} />
        </Switch>
      </Container>
    </Router>
  );
}
