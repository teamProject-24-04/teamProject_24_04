import React, { useState } from 'react';
import { Modal, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const FindLoginId = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loginId, setLoginId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/member/findLoginId', { email, name });
      const { loginId } = response.data.member;
      setLoginId(loginId);
      setError('');
    } catch (error) {
      setError('아이디를 찾을 수 없습니다.');
    }
  };

  const handleConfirm = () => {
    // 아이디, 이메일, 이름 초기화
    setLoginId('');
    setEmail('');
    setName('');
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
          아이디 찾기
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="이메일"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="이름"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
            찾기
          </Button>
        </form>
        {error && <Typography color="error">{error}</Typography>}
        {loginId && (
          <>
            <Typography>{`당신의 아이디는 ${loginId}입니다.`}</Typography>
            <Button onClick={handleConfirm} variant="contained" fullWidth>
              확인
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default FindLoginId;
