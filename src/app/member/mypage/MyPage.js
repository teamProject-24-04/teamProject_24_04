import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { IoPersonAdd, IoSettingsOutline } from 'react-icons/io5';
import { LuPencil } from 'react-icons/lu';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { LuBookCopy } from 'react-icons/lu';
import { FaPlus } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import MyPageModify from './myPageModify';

const MyPage = () => {
  const [showModifyPage, setShowModifyPage] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        font-family: 'Inter', sans-serif;
      }
    `;
    document.head.appendChild(style);
  }, []);

  let memberInfoString = '';
  let memberInfo = {};
  let regDate = '';
  if (typeof localStorage !== 'undefined') {
    memberInfoString = localStorage.getItem('member');
    memberInfo = JSON.parse(memberInfoString);
    regDate = memberInfo?.member?.regDate;
  }
  const formattedRegDate = regDate?.slice(0, 10);

  const goToModifyPage = () => {
    setShowModifyPage(true);
  };

  if (showModifyPage) {
    return <MyPageModify />;
  }

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
        <div style={{ fontWeight: 'bold', marginLeft: '13px' }}>{memberInfo.member.name}</div>
        <LuPencil style={{ marginLeft: '13px', marginTop: '7px', fontSize: '9px' }} />
      </div>
      <Box sx={{ display: 'flex', marginTop: '20px' }}>
        <Card variant="outlined">
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
        </Card>
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
            가입일
            {formattedRegDate}
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
            레시피 수<br />
            5개
          </Box>
        </Box>
      </Box>
      <div style={{ display: 'flex' }}>
        <Box
          height={130}
          width={190}
          backgroundColor="#ACB9D1"
          my={4}
          sx={{ border: '2px solid grey' }}
          borderRadius={1}>
          <div style={{ marginTop: '7px' }}>
            내 게시글 바로가기
            <FaPlus style={{ marginLeft: '30px', color: '#538DFF' }} />
          </div>
          <div style={{ marginTop: '13px', fontWeight: 'bold' }}>35개</div>
          <div style={{ marginTop: '7px' }}>
            내 댓글 바로가기
            <FaPlus style={{ marginLeft: '45px', color: '#538DFF' }} />
          </div>
          <div style={{ marginTop: '13px', fontWeight: 'bold' }}>35개</div>
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
            나의 쇼핑
            <FaPlus style={{ marginLeft: '95px', color: '#538DFF' }} />
          </div>
          <FiShoppingCart style={{ fontSize: '50px', marginTop: '20px', marginLeft: '60px' }} />
          <div style={{ marginTop: '5px', fontWeight: 'bold', textAlign: 'right' }}>3개</div>
        </Box>
      </div>

      <Box
        height={130}
        width={390}
        backgroundColor="#D9D9D9"
        sx={{ border: '2px solid grey' }}
        borderRadius={1}>
        <div style={{ marginTop: '7px', marginLeft: '7px', display: 'flex' }}>찜한 목록</div>
        <div style={{ marginTop: '20px', marginLeft: '7px', display: 'flex' }}>찜한 유튜버</div>
        <div style={{ marginTop: '20px', marginLeft: '7px', display: 'flex' }}>찜한 친구</div>
      </Box>

      <Box
        height={130}
        width={390}
        my={2}
        backgroundColor="#D9D9D9"
        sx={{ border: '2px solid grey' }}
        borderRadius={1}>
        <div style={{ marginTop: '7px', marginLeft: '7px', display: 'flex' }}>문의 하기</div>
        <div style={{ marginTop: '20px', marginLeft: '7px', display: 'flex' }}>비밀번호 변경</div>
        <div style={{ marginTop: '20px', marginLeft: '7px', display: 'flex' }}>
          회원정보 변경
          <IoIosArrowForward
            style={{ marginLeft: '258px', color: '#538DFF' }}
            onClick={goToModifyPage}
          />
        </div>
      </Box>
    </>
  );
};

export default MyPage;