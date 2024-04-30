'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Page() {
  const [members, setMembers] = useState([]);
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await axios.get('/api/members');
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    }

    fetchMembers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/login', { loginId, loginPw });
      const response = await axios.get('/api/members');
      setMembers(response.data);
      // 작성 후 입력 필드 초기화
      setLoginId('');
      setLoginPw('');
    } catch (error) {
      console.error('Error writing member:', error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            className="tw-input tw-input-bordered"
            type="text"
            placeholder="아이디 입력"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <input
            className="tw-input tw-input-bordered"
            type="password"
            placeholder="비밀번호 입력"
            value={loginPw}
            onChange={(e) => setLoginPw(e.target.value)}
          />
          <input className="tw-btn tw-btn-sm tw-btn-outline" type="submit" value="로그인" />
        </form>
      </div>
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
    </>
  );
}
