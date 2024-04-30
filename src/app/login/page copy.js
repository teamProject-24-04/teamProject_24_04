'use client';

// src/app/Page.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

export default function Page() {
  const formSchema = yup.object({
    email: yup.string().required('이메일을 입력해주세요').email('이메일 형식이 아닙니다.'),
    password: yup
      .string()
      .required('영문, 숫자포함 8자리를 입력해주세요.')
      .min(8, '최소 8자 이상 가능합니다')
      .max(15, '최대 15자 까지만 가능합니다')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/, '영문 숫자포함 8자리를 입력해주세요.'),
    passwordConfirm: yup.string().oneOf([yup.ref('password')], '비밀번호가 다릅니다.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const [members, setMembers] = useState([]);

  useEffect(() => {
      try {
        const response = await axios.get('/api/members');
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching member:', error);
      }
    }

    fetchMembers();
  }, []);

  const handleLogin = async (data) => {
    try {
      await axios.post('/api/login', data);
      const response = await axios.get('/api/members');
      setMembers(response.data);
      reset(); // 입력 필드 초기화
    } catch (error) {
      console.error('Error writing member:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h3" align="center" gutterBottom>
        로그인
      </Typography>
      <form onSubmit={handleSubmit(handleLogin)}>
        <TextField
          name="email"
          label="이메일"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          name="password"
          type="password"
          label="비밀번호"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          name="passwordConfirm"
          type="password"
          label="비밀번호 확인"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('passwordConfirm')}
          error={!!errors.passwordConfirm}
          helperText={errors.passwordConfirm?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!!errors.email || !!errors.password || !!errors.passwordConfirm}>
          로그인
        </Button>
      </form>
      <div>
        <h1>Member</h1>
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              <h2>{member.loginId}</h2>
              <p>{member.loginPw}</p>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
