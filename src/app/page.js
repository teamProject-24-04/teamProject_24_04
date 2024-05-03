'use client';
// src/pages/login.js
import React, { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/member/login', { loginId, loginPw });
      setSuccessMessage('로그인에 성공했습니다.');
      // 로그인 성공시 리다이렉트 또는 다른 작업을 수행할 수 있습니다.
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.status === 401) {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setError('로그인에 실패했습니다.');
      }
    }
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={loginPw}
          onChange={(e) => setLoginPw(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}
