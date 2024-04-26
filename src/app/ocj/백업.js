'use client';
import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import RootTheme from './theme';

import RecipyDetail from '../app/recipy/recipyDetail';
import Write from './recipy/Write';

import { AppBar, Toolbar, Box, BottomNavigation, BottomNavigationAction } from '@mui/material';

import {
  Person as PersonIcon,
  ShoppingBag as ShoppingBagIcon,
  Navigation as NavigationIcon,
  Forum as ForumIcon,
  Receipt as ReceiptIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

function App() {
  const [bottomValue, setBottomValue] = React.useState(0);
  const [selectedTab, setSelectedTab] = useState('RecipyDetail');
  return (
    <>
      <AppBar position="fixed">
        <Toolbar></Toolbar>
      </AppBar>
      <Toolbar />

      {/* 삼항 연산자를 사용하여 BottomNavigationAction을 클릭했을 때, 해당하는 컴포넌트를 렌더링 */}
      {selectedTab === 'RecipyDetail' ? <RecipyDetail /> : <Write />}

      <BottomNavigation />
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
        <BottomNavigation
          showLabels
          value={bottomValue}
          onChange={(event, newValue) => {
            setBottomValue(newValue);
          }}>
          <BottomNavigationAction label="쇼핑" icon={<ShoppingBagIcon />} />
          <BottomNavigationAction label="레시피" icon={<ReceiptIcon />} />
          <BottomNavigationAction label="자유게시판" icon={<ForumIcon />} />
          <BottomNavigationAction label="길찾기" icon={<NavigationIcon />} />
          <BottomNavigationAction label="마이페이지" icon={<PersonIcon />} />
        </BottomNavigation>
      </Box>
    </>
  );
}

export default function themeApp() {
  const theme = RootTheme();

  return <App />;
}
