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
import { CgProfile } from "react-icons/cg";
import { LuPencil } from "react-icons/lu";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

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
      <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
        나의 레시피
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
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
      <Box sx={{ width: '50%', marginTop:'20px' }}>
  <Card variant="outlined">{card}</Card>
</Box>
    </>
  );
}