'use client';
//리액트
import React, { useState, useEffect, useRef } from 'react';
//리코일
import { atom, useRecoilState, RecoilRoot } from 'recoil';
//리액트 라우터 돔
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
//db연결을 위한 axios
import axios from 'axios';
//날짜 변환 유틸
import dateToStr from './dateUtil';
//className 사용하게 해주는거
import classNames from 'classnames';
//테마
import RootTheme from './theme';

import MainPage from './mainPage';

function MainPage2() {
  return (
    <>
      <div>안녕</div>
    </>
  );
}

function App() {
  // 로그인 상태를 로컬 스토리지에서 가져오기
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  // 로그인 상태에 따라 페이지 결정
  return <>{isLoggedIn === null ? <MainPage /> : <MainPage2 />}</>;
}

export default function ThemeApp() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}
