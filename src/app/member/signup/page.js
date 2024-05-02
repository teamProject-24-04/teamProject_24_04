'use client';

import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import axios from 'axios';
import * as yup from 'yup';

// Yup 스키마를 사용하여 유효성 검사를 정의합니다.
const schema = yup.object().shape({
  loginId: yup
    .string()
    .required('아이디를 입력하세요.')
    .matches(/^[a-zA-Z0-9]*$/, '영어와 숫자만 입력해주세요.'), // 영어와 숫자만 허용하는 정규 표현식
  loginPw: yup.string().required('비밀번호를 입력하세요.'),
  confirmLoginPw: yup
    .string()
    .required('비밀번호를 다시 입력하세요.')
    .oneOf([yup.ref('loginPw'), null], '비밀번호가 일치하지 않습니다.'),
});

export default function Page() {
  // 상태 변수를 사용하여 아이디, 비밀번호, 비밀번호 확인, 중복 여부, 회원 리스트를 관리합니다.
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [confirmLoginPw, setConfirmLoginPw] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [members, setMembers] = useState([]);
  const [errors, setErrors] = useState({
    loginId: '',
    loginPw: '',
    confirmLoginPw: '',
  });

  // 회원 리스트를 불러오는 함수를 생성합니다.
  const fetchMembers = async () => {
    try {
      const response = await axios.get('/api/member/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  // 컴포넌트가 마운트될 때 한 번만 회원 리스트를 불러옵니다.
  useEffect(() => {
    fetchMembers();
  }, []);

  // 아이디 입력 시 중복 여부를 확인하는 함수
  const handleIdChange = (event) => {
    const newLoginId = event.target.value;
    setLoginId(newLoginId);
    // 중복 아이디 검사
    const duplicateCheck = members.find((member) => member.loginId === newLoginId);
    if (duplicateCheck) {
      setIsDuplicate(true);
    } else {
      setIsDuplicate(false);
    }
  };

  // 비밀번호 확인 입력 시 일치 여부를 확인하는 함수
  const handleConfirmPasswordChange = (event) => {
    const newPassword = event.target.value;
    setConfirmLoginPw(newPassword);
    if (newPassword !== loginPw) {
      setErrors((prevState) => ({ ...prevState, confirmLoginPw: '비밀번호가 일치하지 않습니다.' }));
    } else {
      setErrors((prevState) => ({ ...prevState, confirmLoginPw: '' }));
    }
  };

  // 회원가입 폼을 제출하는 함수를 생성합니다.
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // 입력값의 유효성을 검사합니다.
      schema
        .validate({ loginId, loginPw, confirmLoginPw }, { abortEarly: false })
        .then(() => {
          // 중복 아이디 검사
          const duplicateCheck = members.find((member) => member.loginId === loginId);
          if (duplicateCheck) {
            setIsDuplicate(true);
            return; // 중복 아이디가 있으면 함수 종료
          }

          // 중복된 아이디가 없으면 회원가입 처리
          axios
            .post('/api/member/signup', { loginId, loginPw })
            .then(() => {
              // 회원가입 후에는 회원 리스트를 다시 불러옵니다.
              fetchMembers();
              // 회원가입 후 입력 필드 초기화
              setLoginId('');
              setLoginPw('');
              setConfirmLoginPw('');
            })
            .catch((error) => console.error('Error writing member:', error));
        })
        .catch((errors) => {
          // Yup 유효성 검사 오류를 처리합니다.
          errors.inner.forEach((err) => {
            if (err.path === 'loginId') {
              setErrors((prevState) => ({ ...prevState, loginId: err.message }));
            } else if (err.path === 'loginPw') {
              setErrors((prevState) => ({ ...prevState, loginPw: err.message }));
            } else if (err.path === 'confirmLoginPw') {
              setErrors((prevState) => ({ ...prevState, confirmLoginPw: err.message }));
            }
          });
        });
    } catch (error) {
      console.error('Error writing member:', error);
    }
  };

  return (
    // MUI 컨테이너로 UI를 감싸고, 회원가입 폼과 회원 리스트를 표시합니다.
    <Container maxWidth="md">
      <div>
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <TextField
            variant="outlined"
            label="아이디 입력"
            value={loginId}
            onChange={handleIdChange}
            fullWidth
            margin="normal"
            error={!!errors.loginId || isDuplicate}
            helperText={
              errors.loginId || (isDuplicate ? '중복된 아이디입니다.' : '아이디를 입력하세요.')
            }
            onKeyUp={(e) => {
              if (e.target.value.trim() === '') {
                setErrors((prevState) => ({ ...prevState, loginId: '아이디를 입력하세요.' }));
              } else {
                setErrors((prevState) => ({ ...prevState, loginId: '' }));
              }
            }}
          />
          <TextField
            variant="outlined"
            label="비밀번호 입력"
            type="password"
            value={loginPw}
            onChange={(e) => {
              setLoginPw(e.target.value);
              setErrors((prevState) => ({ ...prevState, loginPw: '' }));
            }}
            fullWidth
            margin="normal"
            error={!!errors.loginPw}
            helperText={errors.loginPw}
            onKeyUp={(e) => {
              if (e.target.value.trim() === '') {
                setErrors((prevState) => ({ ...prevState, loginPw: '비밀번호를 입력하세요.' }));
              } else {
                setErrors((prevState) => ({ ...prevState, loginPw: '' }));
              }
            }}
          />
          <TextField
            variant="outlined"
            label="비밀번호 확인"
            type="password"
            value={confirmLoginPw}
            onChange={handleConfirmPasswordChange}
            fullWidth
            margin="normal"
            error={!!errors.confirmLoginPw}
            helperText={errors.confirmLoginPw}
            onKeyUp={(e) => {
              if (e.target.value.trim() === '') {
                setErrors((prevState) => ({
                  ...prevState,
                  confirmLoginPw: '비밀번호를 입력해주세요.',
                }));
              } else {
                setErrors((prevState) => ({ ...prevState, confirmLoginPw: '' }));
              }
            }}
          />
          <Button
            variant="outlined"
            type="submit"
            style={{ marginTop: '10px' }}
            disabled={
              !!errors.loginId || !!errors.loginPw || !!errors.confirmLoginPw || isDuplicate
            }>
            회원가입
          </Button>
        </form>
      </div>
      <div>
        <Typography variant="h4" gutterBottom>
          Member
        </Typography>
        <List>
          {members.map((member) => (
            <ListItem key={member.id}>
              <ListItemText primary={member.loginId} secondary={member.loginPw} />
            </ListItem>
          ))}
        </List>
      </div>
    </Container>
  );
}
