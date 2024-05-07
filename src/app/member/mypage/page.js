'use client';
import React, { useState } from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import RootTheme from '@/app/theme';
import MyPageModify from './myPageModify';
import MyPage from './MyPage';

const App = () => {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/" exact>
            <MyPage />
          </Route>
          <Route path="/mypage" component={MyPageModify} /> {/* 경로 변경 */}
        </Switch>
      </Container>
    </Router>
  );
};

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
