'use client';

import React, { useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Card,
  CardActions,
  CardContent,
  Tyopgraphy,
} from '@mui/material';
import { IoPersonAdd, IoSettingsOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { LuBookCopy } from "react-icons/lu";
import { FaPlus } from "react-icons/fa";

export default function Sub() {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        font-family: 'Inter', sans-serif;
      }
    `;
    document.head.appendChild(style);
  }, []);

  
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

const card = (
  <React.Fragment>
    <CardContent style={{backgroundColor:'#ACB9D1'}}>
    <Typography sx={{ fontSize: 14, fontWeight: 'bold', display: 'flex', alignItems: 'center' }} color="text.secondary" gutterBottom>   
        나의 레시피
        <FaPlus style={{ marginLeft: '75px' }} />
      </Typography>
      <LuBookCopy style={{ fontSize: '60px' }}/>
    </CardContent>
    <CardActions>
      <Button size="small">기록 하기</Button>
    </CardActions>
  </React.Fragment>
);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>   
        <IoPersonAdd style={{ marginRight: '12px', fontSize: '24px' }} />
        <IoSettingsOutline style={{ fontSize: '24px' }} />
      </div>                                                                                                                                                                           
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '100px', marginLeft: '30px' }}>
      <Stack direction="row" spacing={2}>
      <Avatar  alt="Remy Sharp" src="/profile/cat.jpg" />
    </Stack>
        <div style={{ fontWeight: 'bold',marginLeft: '13px' }}>김선우</div>
        <LuPencil style={{ marginLeft: '13px',marginTop:'7px', fontSize:'9px'}}/>
      </div>
      <Box sx={{ display: 'flex', marginTop: '20px' }}>
  <Card variant="outlined">{card}</Card>
  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <Box
      marginLeft={1}
      height={50}
      width={150}
      backgroundColor='#ACB9D1'
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
      가입 날짜
      2024.04.15
    </Box>
    <Box
      marginLeft={1}
      height={50}
      width={150}
      backgroundColor='#ACB9D1'
      my={1}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
      레시피 수
      <br></br>
      5개
    </Box>
  </Box>
</Box>
    </>
  );
}