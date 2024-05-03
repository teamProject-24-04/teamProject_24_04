'use client';
//리액트
import React, { useState, useEffect, useRef } from 'react';
//리코일
import { atom, useRecoilState, RecoilRoot } from 'recoil';
//리액트 라우터 돔
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
//db연결을 위한 axios
import axios from 'axios';
//날짜 변환 유틸
import dateToStr from './dateUtil';
//className 사용하게 해주는거
import classNames from 'classnames';
//테마 입히는거
import RootTheme from './theme';

//컴포넌트화 시킨 파일들
import Write from './ocj/Write';
import RecipyDetail from './ocj/recipyDetail';

//mui 컴포넌트
import {
  AppBar,
  Toolbar,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Snackbar,
  Alert,
} from '@mui/material';

//아이콘
import {
  Person as PersonIcon,
  ShoppingBag as ShoppingBagIcon,
  Navigation as NavigationIcon,
  Forum as ForumIcon,
  Receipt as ReceiptIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

//스낵바 알림창 시작
function NoticeSnackbar({ status }) {
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

function useNoticeSnackbarStatus() {
  const [opened, setOpened] = React.useState(false);
  const [autoHideDuration, setAutoHideDuration] = React.useState(null);
  const [variant, setVariant] = React.useState(null);
  const [severity, setSeverity] = React.useState(null);
  const [msg, setMsg] = React.useState(null);

  const open = (msg, severity = 'success', autoHideDuration = 3000, variant = 'filled') => {
    setOpened(true);
    setMsg(msg);
    setSeverity(severity);
    setAutoHideDuration(autoHideDuration);
    setVariant(variant);
  };

  const close = () => {
    setOpened(false);
  };

  return {
    opened,
    open,
    close,
    autoHideDuration,
    variant,
    severity,
    msg,
  };
}
//스낵바 알림창 여기까지

//article 관련 스테이터스

const articlesAtom = atom({
  key: 'app/articlesAtom',
  default: [],
});

function useArticlesStatus() {
  const [articles, setArticles] = useRecoilState(articlesAtom);

  useEffect(() => {
    // API 호출하여 글 목록을 가져옴
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/recipy/getArticles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []); // 마운트될

  // 작성
  const articleWrite = (boardId, title, content) => {
    const id = articles.length + 1; // Get the new id based on the current length of the articles array
    const newArticle = {
      id,
      boardId,
      title,
      content,
      regDate: dateToStr(new Date()),
      updateDate: dateToStr(new Date()), // Assuming dateToStr is defined elsewhere
    };
    setArticles((prevArticles) => [newArticle, ...prevArticles]);
  };

  // 삭제
  const articleDelete = (id) => {
    setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id));
  };

  //아티클의 인덱스를 아이디로 찾기
  const findArticleIndexById = (id) => {
    return articles.findIndex((article) => article.id === id);
  };
  //찾아온 인덱스로 아티클 찾기
  const findArticleById = (id) => {
    const index = findArticleIndexById(id);

    if (index === -1) {
      return null;
    }

    return articles[index];
  };

  return {
    articles,
    articleWrite,
    articleDelete,
    findArticleIndexById,
    findArticleById,
  };
}
//article 관련 스테이터스 끝

//reply 관련 스테이터스

const repliesAtom = atom({
  key: 'app/repliesAtom',
  default: [],
});

function useRepliesStatus() {
  const [replies, setReplies] = useRecoilState(repliesAtom);

  useEffect(() => {
    // API 호출하여 댓글 목록을 가져옴
    const fetchReplies = async () => {
      try {
        const response = await axios.get('/api/reply/getReplies');
        setReplies(response.data);
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    };

    fetchReplies();
  }, []); // 마운트될

  // 작성
  const replyWrite = (content) => {
    const id = articles.length + 1; // Get the new id based on the current length of the articles array
    const newReply = {
      id,
      regDate: dateToStr(new Date()),
      updateDate: dateToStr(new Date()), // Assuming dateToStr is defined elsewhere
      content,
    };
    setReplies((prevReplies) => [newReply, ...prevReplies]);
  };

  return {
    replies,
    setReplies,
    replyWrite,
  };
}
//reply 관련 스테이터스 끝

function App() {
  const [bottomValue, setBottomValue] = React.useState(0);
  const noticeSnackbarStatus = useNoticeSnackbarStatus();
  const articlesStatus = useArticlesStatus();
  const repliesStatus = useRepliesStatus();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar></Toolbar>
      </AppBar>
      <Toolbar />
      <NoticeSnackbar status={noticeSnackbarStatus} />
      <div className="tw-flex">
        <div>안녕</div>
        <div>안녕</div>
      </div>
      {/* <Write articlesStatus={articlesStatus} noticeSnackbarStatus={noticeSnackbarStatus} /> */}
      <RecipyDetail noticeSnackbarStatus={noticeSnackbarStatus} repliesStatus={repliesStatus} />

      <Box sx={{ height: '50px' }} />
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

  return (
    <Router>
      <RecoilRoot>
        {' '}
        {/* 리코일 루트로 감싸기 */}
        <App />
      </RecoilRoot>
    </Router>
  );
}
