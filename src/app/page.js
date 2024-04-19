'use client';

import * as React from 'react';
import { Button, Box, Stack } from '@mui/material';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import theme from './theme';

export default function App() {
  const Rest_api_key = '2b0126c640456aaae60160b93a596b32'; //REST API KEY
  const redirect_uri = 'http://localhost:3000/auth'; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  const clientId = '438070327498-9lfbfa71c0koniubtg33rntf2q95456n.apps.googleusercontent.com';

  return (
    <Box sx={{ backgroundColor: 'black', height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: '80%', height: '70%', position: 'relative' }}>
        <video muted autoPlay loop style={{ width: '100%', height: '40%', objectFit: 'fill', borderRadius: '10px', overflow: 'hidden' }}>
          <source src="/videos/Preview.mp4" type="video/mp4" />
        </video>
        <Stack sx={{ position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '24px' }}>
          <Button onClick={handleLogin} className="KakaoButton" style={{ backgroundImage: `url('/kakaologin.png')`, backgroundSize: 'cover', backgroundPosition: 'center', width: '200px', height: '50px', border: 'none' }} />
          <div style={{ width: '200px', height: '50px', marginTop: '20px' }}>
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin
                onSuccess={(res) => {
                  console.log(res);
                }}
                onFailure={(err) => {
                  console.log(err);
                }}
              />
            </GoogleOAuthProvider>
          </div>
          <a style={{ width: '200px', height: '50px', marginTop: '20px', textAlign:'center', fontSize:'15px' }}>회원 가입</a>
        </Stack>
      </Box>
      <Button variant="outlined" href="sub/" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
        sub로 이동
      </Button>
    </Box>
  );
}