'use client';
//리액트
import React, { useState, useEffect, useRef } from 'react';
//리코일
import { atom, useRecoilState, RecoilRoot } from 'recoil';
//리액트 라우터 돔
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
//db연결을 위한 axios
// import axios from 'axios';
//날짜 변환 유틸
// import dateToStr from '../app/Ut/dateUtil';
//className 사용하게 해주는거
import classNames from 'classnames';
//테마
// import RootTheme from './theme';
import MainPage from './mainPage';
// import YoutuberList from './youtuberList/YoutuberList';
// import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
// import {
//   Person as PersonIcon,
//   ShoppingBag as ShoppingBagIcon,
//   Navigation as NavigationIcon,
//   Forum as ForumIcon,
//   Receipt as ReceiptIcon,
// } from '@mui/icons-material';
import BottomNavigationComponent from './BottomNavigationComponent';

import useNoticeSnackBarStatus from './Ut/noticeSnackBar/noticeSnackBarStatus';

//mui 컴포넌트
import { Snackbar, Alert } from '@mui/material';

function NoticeSnackBar({ status }) {
  return (
    <>
      <Snackbar
        open={status.opened}
        autoHideDuration={status.autoHideDuration}
        onClose={status.close}>
        <Alert variant={status.variant} severity={status.severity}>
          {status.msg}
        </Alert>
      </Snackbar>
    </>
  );
}

function MainPage2() {
  const [bottomValue, setBottomValue] = React.useState(0);
  const noticeSnackBarStatus = useNoticeSnackBarStatus();
  return (
    <>
      <NoticeSnackBar status={noticeSnackBarStatus} />
      <BottomNavigationComponent noticeSnackBarStatus={noticeSnackBarStatus} />
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState('false');

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedIsLoggedIn === 'true'); // 로컬 스토리지에서 가져온 값이 문자열이므로 불리언으로 변환
  }, []);

  return <>{isLoggedIn === false ? <MainPage /> : <MainPage2 />}</>;
}

export default function ThemeApp() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}
