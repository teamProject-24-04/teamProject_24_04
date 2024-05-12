import React, { useState } from 'react';
import { Modal, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const FindLoginPw = ({ open, onClose }) => {
  const [loginId, setLoginId] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loginPw, setLoginPw] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/member/findLoginPw', { loginId, email });
      const { loginPw } = response.data.member;
      setLoginPw(loginPw);
      setError('');
    } catch (error) {
      setError('비밀번호를 찾을 수 없습니다.');
    }
  };

  const handleConfirm = () => {
    // 초기화
    setLoginId('');
    setEmail('');
    setLoginPw('');
    // 모달 창 닫기
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          maxWidth: 400,
          margin: 'auto',
          marginTop: 100,
        }}>
        <Typography variant="h6" gutterBottom>
          비밀번호 찾기
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="로그인 아이디"
            variant="outlined"
            fullWidth
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="이메일"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
            찾기
          </Button>
        </form>
        {error && <Typography color="error">{error}</Typography>}
        {loginPw && (
          <>
            <Typography>{`당신의 비밀번호는 ${loginPw}입니다.`}</Typography>
            <Button onClick={handleConfirm} variant="contained" fullWidth>
              확인
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default FindLoginPw;
