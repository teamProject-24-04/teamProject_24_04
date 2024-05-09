'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Snackbar } from '@mui/material';

const LoginPage = () => {
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [jibunAddress, setJibunAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [regDate, setRegDate] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      if (window.confirm('이미 로그인 중입니다. 로그아웃하시겠습니까?')) {
        handleLogout();
      } else {
        window.location.href = '/youtuberList';
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/member/login', { loginId, loginPw });
      const member = response.data;
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('loginId', loginId);
      localStorage.setItem('loginPw', loginPw);
      localStorage.setItem('name', member.member.name);
      localStorage.setItem('nickname', member.member.nickname);
      localStorage.setItem('phoneNumber', member.member.phoneNumber);
      localStorage.setItem('address', member.member.address);
      localStorage.setItem('roadAddress', member.member.roadAddress);
      localStorage.setItem('jibunAddress', member.member.jibunAddress);
      localStorage.setItem('detailAddress', member.member.detailAddress);
      localStorage.setItem('latitude', member.member.latitude);
      localStorage.setItem('longitude', member.member.longitude);
      localStorage.setItem('regDate', member.member.regDate);
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.status === 401) {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setError('로그인에 실패했습니다.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginId');
    localStorage.removeItem('loginPw');
    localStorage.removeItem('name');
    localStorage.removeItem('nickname');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('address');
    localStorage.removeItem('roadAddress');
    localStorage.removeItem('jibunAddress');
    localStorage.removeItem('detailAddress');
    localStorage.removeItem('latitude');
    localStorage.removeItem('longitude');
    localStorage.removeItem('regDate');
    window.location.href = '/member/login'; // 경로 수정
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Snackbar 닫기 함수
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        로그인 페이지
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="아이디"
          variant="outlined"
          fullWidth
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          type="password"
          label="비밀번호"
          variant="outlined"
          fullWidth
          value={loginPw}
          onChange={(e) => setLoginPw(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth>
          로그인
        </Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}
      <Snackbar // Snackbar 추가
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="회원가입이 성공했습니다."
      />
    </Box>
  );
};

export default LoginPage;
