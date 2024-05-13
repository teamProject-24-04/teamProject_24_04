import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Snackbar, Link } from '@mui/material';
import FindLoginId from './FindLoginId';
import FindLoginPw from './FindLoginPw';
import Sign from '../signup/Sign';
import { IoIosArrowBack } from 'react-icons/io';

const LoginPage = ({ setShowLoginPage }) => {
  const goBack = () => {
    setShowLoginPage(false);
  };

  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [idModalOpen, setIdModalOpen] = useState(false);
  const [pwModalOpen, setPwModalOpen] = useState(false);
  const [showSign, setShowSign] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      if (window.confirm('이미 로그인 중입니다. 로그아웃하시겠습니까?')) {
        handleLogout();
      } else {
        window.location.href = '/';
      }
    }
  }, []);

  const goToSign = () => {
    setShowSign(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/member/login', { loginId, loginPw });
      const member = response.data;
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('loginId', loginId);
      localStorage.setItem('loginPw', loginPw);
      localStorage.setItem('memberId', member.member.id);
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
      localStorage.setItem('email', member.member.email);
      localStorage.setItem('authlevel', member.member.authlevel);
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
    localStorage.clear();
    window.location.href = '/member/login';
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (showSign) {
    return <Sign setShowSign={setShowSign} />;
  }

  return (
    <Box sx={{ bgcolor: '#FAE0D4', minHeight: '100vh', py: 4, width: '100%' }}>
      <Typography variant="h4" align="left" gutterBottom>
        Grill Master
      </Typography>
      <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4, bgcolor: 'white', p: 3, borderRadius: 10 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IoIosArrowBack style={{ marginRight: '10px', fontSize: '30px' }} onClick={goBack} />
          <Typography variant="h4" align="left" gutterBottom>
            일반 로그인
          </Typography>
        </Box>
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
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mb: 2, borderRadius: 20, bgcolor: 'red', fontWeight: 'Bold' }}>
            로그인
          </Button>
        </form>
        {error && <Typography color="error">{error}</Typography>}
        <Button
          variant="contained"
          onClick={goToSign}
          fullWidth
          sx={{ borderRadius: 20, bgcolor: 'brown', color: 'white', fontWeight: 'Bold' }}>
          회원가입
        </Button>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          <Button
            sx={{ color: 'black', textDecoration: 'none' }}
            onClick={() => setIdModalOpen(true)}>
            아이디 찾기
          </Button>
          <FindLoginId open={idModalOpen} onClose={() => setIdModalOpen(false)} />
          &nbsp;|&nbsp;
          <Button
            sx={{ color: 'black', textDecoration: 'none' }}
            onClick={() => setPwModalOpen(true)}>
            비밀번호 찾기
          </Button>
          <FindLoginPw open={pwModalOpen} onClose={() => setPwModalOpen(false)} />
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
