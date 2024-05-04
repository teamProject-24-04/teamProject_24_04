'use client';

import React, { useEffect } from 'react';
import { Button, Box, Stack } from '@mui/material';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Link from 'next/link';
import './globals.css';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';

export default function MainPage() {
  const Rest_api_key = '2b0126c640456aaae60160b93a596b32'; //REST API KEY
  const redirect_uri = 'http://localhost:3000/auth'; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  const clientId = '438070327498-9lfbfa71c0koniubtg33rntf2q95456n.apps.googleusercontent.com';

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'black',
          height: '100vh',
          width: '100vw',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url('/mainImage.png')`, // 이미지를 백그라운드로 설정
          backgroundSize: 'cover', // 이미지를 채울 수 있도록 cover로 설정
          backgroundPosition: 'center', // 이미지를 가운데 정렬
          borderRadius: '10px',
        }}>
        <Box sx={{ width: '80%', height: '70%', position: 'relative' }}>
          <Stack
            sx={{
              position: 'absolute',
              top: '85%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '24px',
            }}>
            <Button
              onClick={handleLogin}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '200px',
                height: '47px',
                marginTop: '20px',
                backgroundColor: 'yellow',
                fontFamily: 'Noto Sans KR',
                color: 'black',
                textAlign: 'center', // 텍스트 가운데 정렬
                paddingLeft: '10px', // 아이콘과 텍스트 사이의 간격을 주기 위한 여백
              }}>
              <RiKakaoTalkFill style={{ marginRight: '5px', fontSize: '45px', color: 'black' }} />
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  width: '100%', // 텍스트를 가운데 정렬하기 위해 필요
                  textAlign: 'left', // 텍스트 가운데 정렬
                  paddingLeft: '15px',
                }}>
                카카오 로그인
              </span>
            </Button>
            <Button
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '200px',
                height: '47px',
                marginTop: '20px',
                backgroundColor: '#FFFFFF',
                fontFamily: 'Noto Sans KR',
                color: 'black',
                textAlign: 'center', // 텍스트 가운데 정렬
                paddingLeft: '10px', // 아이콘과 텍스트 사이의 간격을 주기 위한 여백
                '&:active': {
                  backgroundColor: '#FFFFFF', // 클릭 시 배경색 유지
                },
              }}>
              <FcGoogle style={{ fontSize: '45px' }} />
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  width: '100%', // 텍스트를 가운데 정렬하기 위해 필요
                  textAlign: 'left', // 텍스트 가운데 정렬
                  paddingLeft: '20px',
                }}>
                구글 로그인
              </span>
            </Button>

            {/* <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin
                  onSuccess={(res) => {
                    console.log(res);
                  }}
                  onFailure={(err) => {
                    console.log(err);
                  }}
                />
            </GoogleOAuthProvider> */}
            <div style={{ textAlign: 'center', marginTop: '25px' }}>
              <Link
                href="/member/login"
                underline="none"
                sx={{
                  width: '200px',
                  height: '50px',
                  marginTop: '30px',
                  textAlign: 'center',
                  fontSize: '12px',
                }}>
                로그인
              </Link>
              <br></br>
              <Link
                href="/member/signup"
                underline="none"
                sx={{
                  width: '200px',
                  height: '50px',
                  marginTop: '10px',
                  textAlign: 'center',
                  fontSize: '12px',
                }}>
                회원 가입
              </Link>
            </div>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
