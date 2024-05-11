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

// //mui 컴포넌트(Snac)
// import { Snackbar, Alert } from '@mui/material';

// import useNoticeSnackbarStatus from './Ut/noticeSnackBarStatus';

// //스낵바 알림창 시작
// function useNoticeSnackbarStatus() {
//   const [opened, setOpened] = React.useState(false);
//   const [autoHideDuration, setAutoHideDuration] = React.useState(null);
//   const [variant, setVariant] = React.useState(null);
//   const [severity, setSeverity] = React.useState(null);
//   const [msg, setMsg] = React.useState(null);

//   const open = (msg, severity = 'success', autoHideDuration = 3000, variant = 'filled') => {
//     setOpened(true);
//     setMsg(msg);
//     setSeverity(severity);
//     setAutoHideDuration(autoHideDuration);
//     setVariant(variant);
//   };

//   const close = () => {
//     setOpened(false);
//   };

//   return {
//     opened,
//     open,
//     close,
//     autoHideDuration,
//     variant,
//     severity,
//     msg,
//   };
// }

// function NoticeSnackbar({ status }) {
//   return (
//     <>
//       <Snackbar
//         open={status.opened}
//         autoHideDuration={status.autoHideDuration}
//         onClose={status.close}>
//         <Alert variant={status.variant} severity={status.severity}>
//           {status.msg}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

function MainPage2() {
  const [bottomValue, setBottomValue] = React.useState(0);
  // const noticeSnackbarStatus = useNoticeSnackbarStatus();
  return (
    <>
      {/* <NoticeSnackbar status={noticeSnackbarStatus} /> */}
      <BottomNavigationComponent />
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
