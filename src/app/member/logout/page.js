'use client';
import React, { useEffect } from 'react';

const LogoutPage = () => {
  useEffect(() => {
    // localStorage에서 사용자 정보 삭제
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginId');
    localStorage.removeItem('loginPw');
    localStorage.removeItem('member'); // 'member' 키에 해당하는 데이터도 삭제
    // 로그아웃 후 로그인 페이지로 이동
    window.location.href = '/';
  }, []);

  return (
    <div>
      <p>로그아웃되었습니다.</p>
    </div>
  );
};

export default LogoutPage;
