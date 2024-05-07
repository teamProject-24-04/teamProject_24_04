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
import { IoPersonAdd, IoSettingsOutline } from 'react-icons/io5';
import { LuPencil } from 'react-icons/lu';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { LuBookCopy } from 'react-icons/lu';
import { FaPlus } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';

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

  // localStorage에서 회원 정보 가져오기
  const memberInfoString = localStorage.getItem('member');

  // 회원 정보 문자열을 객체로 변환
  const memberInfo = JSON.parse(memberInfoString);

  // memberInfo 객체에서 latitude 값 가져오기
  const latitude = memberInfo.member.latitude;

  console.log(latitude); // latitude 값 출력

  const bull = (
    <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
      •
    </Box>
  );

  const card = (
    <React.Fragment>
      <CardContent style={{ backgroundColor: '#ACB9D1' }}>
        <Typography
          sx={{ fontSize: 14, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
          color="text.secondary"
          gutterBottom>
          나의 레시피
          <FaPlus style={{ marginLeft: '75px', color: '#538DFF' }} />
        </Typography>
        <LuBookCopy style={{ fontSize: '60px' }} />
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
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '50px', marginLeft: '30px' }}>
        <Stack direction="row" spacing={2}>
          <Avatar alt="Remy Sharp" src="/profile/cat.jpg" />
        </Stack>
        <div style={{ fontWeight: 'bold', marginLeft: '13px' }}>김선우</div>
        <LuPencil style={{ marginLeft: '13px', marginTop: '7px', fontSize: '9px' }} />
      </div>
      <Box sx={{ display: 'flex', marginTop: '20px' }}>
        <Card variant="outlined">{card}</Card>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            marginLeft={1}
            height={50}
            width={150}
            backgroundColor="#ACB9D1"
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            borderRadius={1}
            sx={{ border: '2px solid grey' }}>
            가입 날짜 2024.04.15
          </Box>
          <Box
            marginLeft={1}
            height={50}
            width={150}
            backgroundColor="#ACB9D1"
            my={1}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            borderRadius={1}
            sx={{ border: '2px solid grey' }}>
            레시피 수<br></br>
            5개
          </Box>
        </Box>
      </Box>
      <div style={{ display: 'flex' }}>
        {' '}
        {/* 가로로 나열되는 플렉스 컨테이너 */}
        <Box
          height={130}
          width={190}
          backgroundColor="#ACB9D1"
          my={4}
          sx={{ border: '2px solid grey' }}
          borderRadius={1}>
          <div style={{ marginTop: '7px' }}>
            {' '}
            {/* 첫 번째 내용과 간격 */}
            내 게시글 바로가기
            <FaPlus style={{ marginLeft: '30px', color: '#538DFF' }} />
          </div>
          <div style={{ marginTop: '13px', fontWeight: 'bold' }}>
            {' '}
            {/* 두 번째 내용과 간격 */}
            35개
          </div>
          <div style={{ marginTop: '7px' }}>
            {' '}
            {/* 세 번째 내용과 간격 */}
            내 댓글 바로가기
            <FaPlus style={{ marginLeft: '45px', color: '#538DFF' }} />
          </div>
          <div style={{ marginTop: '13px', fontWeight: 'bold' }}>
            {' '}
            {/* 네 번째 내용과 간격 */}
            35개
          </div>
        </Box>
        <Box
          marginLeft={2}
          height={130}
          width={190}
          backgroundColor="#ACB9D1"
          my={4}
          sx={{ border: '2px solid grey' }}
          borderRadius={1}>
          <div style={{ marginTop: '7px' }}>
            {' '}
            {/* 첫 번째 내용과 간격 */}
            나의 쇼핑
            <FaPlus style={{ marginLeft: '95px', color: '#538DFF' }} />
          </div>
          <FiShoppingCart style={{ fontSize: '50px', marginTop: '20px', marginLeft: '60px' }} />{' '}
          {/* 아이콘 크기 조절 및 위치 조정 */}
          <div style={{ marginTop: '5px', fontWeight: 'bold', textAlign: 'right' }}>
            {' '}
            {/* 네 번째 내용과 간격 */}
            3개
          </div>
        </Box>
      </div>

      <Box
        height={130}
        width={390}
        backgroundColor="#D9D9D9"
        sx={{ border: '2px solid grey' }} // 요소 사이 간격 조절
        borderRadius={1}>
        <div style={{ marginTop: '7px', marginLeft: '7px', display: 'flex' }}>
          {' '}
          {/* 첫 번째 내용과 간격 */}
          찜한 목록
          <FaPlus style={{ marginLeft: '290px', color: '#538DFF' }} />
        </div>
        <div style={{ marginTop: '20px', marginLeft: '7px', display: 'flex' }}>
          {' '}
          {/* 첫 번째 내용과 간격 */}
          찜한 유튜버
          <FaPlus style={{ marginLeft: '274px', color: '#538DFF' }} />
        </div>
        <div style={{ marginTop: '20px', marginLeft: '7px', display: 'flex' }}>
          {' '}
          {/* 첫 번째 내용과 간격 */}
          찜한 친구
          <FaPlus style={{ marginLeft: '290px', color: '#538DFF' }} />
        </div>
      </Box>

      <Box
        height={130}
        width={390}
        my={2}
        backgroundColor="#D9D9D9"
        sx={{ border: '2px solid grey' }} // 요소 사이 간격 조절
        borderRadius={1}>
        <div style={{ marginTop: '7px', marginLeft: '7px', display: 'flex' }}>
          {' '}
          {/* 첫 번째 내용과 간격 */}
          문의 하기
          <IoIosArrowForward style={{ marginLeft: '290px', color: '#538DFF' }} />
        </div>
        <div style={{ marginTop: '20px', marginLeft: '7px', display: 'flex' }}>
          {' '}
          {/* 첫 번째 내용과 간격 */}
          비밀번호 변경
          <IoIosArrowForward style={{ marginLeft: '258px', color: '#538DFF' }} />
        </div>
        <div style={{ marginTop: '20px', marginLeft: '7px', display: 'flex' }}>
          {' '}
          {/* 첫 번째 내용과 간격 */}
          회원정보 변경
          <IoIosArrowForward style={{ marginLeft: '258px', color: '#538DFF' }} />
        </div>
      </Box>
    </>
  );
}
