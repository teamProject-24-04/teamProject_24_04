// 'use client';
// //리액트
// import React, { useState, useEffect, useRef } from 'react';
// //리코일
// import { atom, useRecoilState, RecoilRoot } from 'recoil';
// //리액트 라우터 돔
// import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// //db연결을 위한 axios
// import axios from 'axios';
// //날짜 변환 유틸
// import dateToStr from '../Ut/dateUtil';
// //className 사용하게 해주는거
// import classNames from 'classnames';
// //테마 입히는거
// import RootTheme from '../theme';

// //컴포넌트화 시킨 파일들
// import Write from './ocj/Write';
// import RecipyDetail from './ocj/RecipyDetail';
// import ShowList from './ocj/ShowList';

// import useArticlesStatus from './recipy/recipyStatus';
// import useRepliesStatus from './reply/replyStatus';

// //mui 컴포넌트
// import {
//   AppBar,
//   Toolbar,
//   Box,
//   BottomNavigation,
//   BottomNavigationAction,
//   Snackbar,
//   Alert,
// } from '@mui/material';

// //아이콘
// import {
//   Person as PersonIcon,
//   ShoppingBag as ShoppingBagIcon,
//   Navigation as NavigationIcon,
//   Forum as ForumIcon,
//   Receipt as ReceiptIcon,
//   Search as SearchIcon,
// } from '@mui/icons-material';

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

// function App() {
//   const [bottomValue, setBottomValue] = React.useState(0);
//   const noticeSnackbarStatus = useNoticeSnackbarStatus();

//   return (
//     <>
//       <Router>
//         <AppBar position="fixed">
//           <Toolbar></Toolbar>
//         </AppBar>
//         <Toolbar />
//         <NoticeSnackbar status={noticeSnackbarStatus} />

//         {/* <Write articlesStatus={articlesStatus} noticeSnackbarStatus={noticeSnackbarStatus} /> */}
//         {/* <RecipyDetail noticeSnackbarStatus={noticeSnackbarStatus} repliesStatus={repliesStatus} /> */}
//         <Routes>
//           <Route path="/" element={<ShowList />} />
//           <Route
//             path="/detail/:id"
//             element={<RecipyDetail noticeSnackbarStatus={noticeSnackbarStatus} />}
//           />
//         </Routes>

//         <Box sx={{ height: '50px' }} />
//         <Box sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
//           <BottomNavigation
//             showLabels
//             value={bottomValue}
//             onChange={(event, newValue) => {
//               setBottomValue(newValue);
//             }}>
//             <BottomNavigationAction label="쇼핑" icon={<ShoppingBagIcon />} />
//             <BottomNavigationAction label="레시피" icon={<ReceiptIcon />} />
//             <BottomNavigationAction label="자유게시판" icon={<ForumIcon />} />
//             <BottomNavigationAction label="길찾기" icon={<NavigationIcon />} />
//             <BottomNavigationAction label="마이페이지" icon={<PersonIcon />} />
//           </BottomNavigation>
//         </Box>
//       </Router>
//     </>
//   );
// }

// export default function themeApp() {
//   const theme = RootTheme();

//   return (
//     <RecoilRoot>
//       {' '}
//       {/* 리코일 루트로 감싸기 */}
//       <App />
//     </RecoilRoot>
//   );
// }
