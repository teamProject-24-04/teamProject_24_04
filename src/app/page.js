'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Button, Box, AppBar, Toolbar } from '@mui/material';
import theme from './theme';

export default function App() {
  return (
    <Box sx={{ backgroundColor: 'black', height: '100vh', width: '100vw' }}>
        <video muted autoPlay loop>
            <source src="/videos/Preview.mp4" type="video/mp4" />
        </video>
        <div>안녕하세요</div>
        <Button variant="outlined" href="sub/">
            sub로 이동
          </Button>
    </Box>

  );
}