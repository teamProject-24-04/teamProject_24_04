import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';

const LoginPage = () => {
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // 페이지 로드 시 로그인 상태 확인
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      // 이미 로그인된 경우, 알림 후 다른 페이지로 이동
      if (window.confirm('이미 로그인 중입니다. 로그아웃하시겠습니까?')) {
        handleLogout();
      } else {
        window.location.href = '/member/mypage';
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/member/login', { loginId, loginPw });
      const member = response.data; // 응답에서 회원 정보를 가져옴
      // 로그인 성공
      localStorage.setItem('isLoggedIn', true); // 로그인 상태를 로컬 스토리지에 저장
      localStorage.setItem('loginId', loginId); // 아이디를 로컬 스토리지에 저장
      localStorage.setItem('member', JSON.stringify(member)); // 회원 정보를 로컬 스토리지에 저장
      window.location.href = '/member/mypage'; // 로그인 후에 페이지 이동
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
    localStorage.removeItem('member');
    window.location.href = 'member/login';
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
    </Box>
  );
};

export default LoginPage;
