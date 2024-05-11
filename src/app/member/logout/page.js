'use client';
import React, { useEffect } from 'react';

const LogoutPage = () => {
  useEffect(() => {
    // localStorage에서 사용자 정보 삭제
    localStorage.removeItem('memberId');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginId');
    localStorage.removeItem('loginPw');
    localStorage.removeItem('name');
    localStorage.removeItem('nickname');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('address');
    localStorage.removeItem('roadAddress');
    localStorage.removeItem('jibunAddress');
    localStorage.removeItem('detailAddress');
    localStorage.removeItem('latitude');
    localStorage.removeItem('longitude');
    localStorage.removeItem('regDate');
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
