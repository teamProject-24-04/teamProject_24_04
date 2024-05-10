import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

const PasswordModal = ({ open, onClose, onConfirm }) => {
  const [password, setPassword] = useState('');

  const handleConfirm = () => {
    // 비밀번호 확인 버튼 클릭 시 실행되는 함수
    onConfirm(password);
    setPassword(''); // 비밀번호 입력 필드 초기화
    onClose(); // 모달 닫기
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>비밀번호를 입력하세요</DialogTitle>
      <DialogContent>
        <TextField
          label="비밀번호"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} color="primary">
          확인
        </Button>
        <Button onClick={onClose} color="secondary">
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordModal;
