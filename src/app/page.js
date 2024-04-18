'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Button, Box, AppBar, Toolbar, Stack } from '@mui/material'; // Stack 추가
import theme from './theme';

export default function App() {
  const Rest_api_key='2b0126c640456aaae60160b93a596b32' //REST API KEY
  const redirect_uri = 'http://localhost:3000/auth' //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
  const handleLogin = ()=>{
      window.location.href = kakaoURL
  }


  return (
    <Box sx={{ backgroundColor: 'black', height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ width: '80%', height: '70%', position: 'relative' }}>
            <video muted autoPlay loop style={{ width: '100%', height: '40%', objectFit: 'fill', borderRadius: '10px', overflow: 'hidden',}}>
                <source src="https://cdn.pixabay.com/video/2021/09/06/87692-602894354_tiny.mp4" type="video/mp4" />
            </video>
            <Stack sx={{ position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '24px' }}> {/* Stack으로 변경 */}
            <Button onClick={handleLogin} className="KakaoButton" style={{ backgroundImage: `url('/kakaologin.png')`, backgroundSize: 'cover', backgroundPosition: 'center', width: '200px', height: '50px', border: 'none' }}>
    </Button>
              <Button variant="outlined" href="sub/">
                구글으로 접속하기
              </Button>
            </Stack>
        </Box>
        <Button variant="outlined" href="sub/" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
            sub로 이동
        </Button>
    </Box>
  );
}