import React, { useEffect, useState } from 'react';
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
  const [name, setName] = useState('');
  const [regDate, setRegDate] = useState('');

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        font-family: 'Inter', sans-serif;
      }
    `;
    document.head.appendChild(style);

    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
    const storedRegDate = localStorage.getItem('regDate');
    if (storedRegDate) {
      const date = new Date(storedRegDate);
      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
      setRegDate(formattedDate);
    }
  }, []);

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
        <div
          style={{
            fontWeight: 'bold',
            marginLeft: '13px',
            flex: 1,
            overflow: 'hidden',
          }}>
          {name}
        </div>
        <LuPencil style={{ marginRight: '13px', marginTop: '7px', fontSize: '9px' }} />
      </div>
      <Box sx={{ display: 'flex', marginTop: '20px' }}>
        <Card variant="outlined" sx={{ width: '100%' }}>
          <CardContent style={{ backgroundColor: '#ACB9D1' }}>
            <Typography
              sx={{ fontSize: 14, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
              color="text.secondary"
              gutterBottom>
              <span style={{ whiteSpace: 'nowrap', flex: '1' }}>나의 레시피</span>
              <FaPlus style={{ marginLeft: '50px', color: '#538DFF' }} />
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
            sx={{ border: '2px solid grey', whiteSpace: 'nowrap' }}>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
              가입일
            </Typography>
            <Typography variant="body2">{regDate}</Typography>
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
            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
              레시피 수
            </Typography>
            <Typography variant="body2">5개</Typography>
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
          <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginLeft: '10px' }}>
            내 게시글 바로가기
          </Typography>
          <Typography variant="body2" style={{ marginLeft: '10px' }}>
            35개
          </Typography>
          <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginLeft: '10px' }}>
            내 댓글 바로가기
          </Typography>
          <Typography variant="body2" style={{ marginLeft: '10px' }}>
            35개
          </Typography>
        </Box>
        <Box
          marginLeft={2}
          height={130}
          width={190}
          backgroundColor="#ACB9D1"
          my={4}
          sx={{ border: '2px solid grey' }}
          borderRadius={1}>
          <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginLeft: '10px' }}>
            나의 쇼핑
          </Typography>
          <FiShoppingCart style={{ fontSize: '50px', marginTop: '20px', marginLeft: '60px' }} />
          <Typography
            variant="body2"
            style={{ fontWeight: 'bold', textAlign: 'right', marginRight: '10px' }}>
            3개
          </Typography>
        </Box>
      </div>

      <Box
        height={130}
        width={360}
        backgroundColor="#D9D9D9"
        sx={{ border: '2px solid grey' }}
        borderRadius={1}>
        <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginLeft: '10px' }}>
          찜한 목록
        </Typography>
        <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginLeft: '10px' }}>
          찜한 유튜버
        </Typography>
        <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginLeft: '10px' }}>
          찜한 친구
        </Typography>
      </Box>

      <Box
        height={130}
        width={360}
        my={2}
        backgroundColor="#D9D9D9"
        sx={{ border: '2px solid grey' }}
        borderRadius={1}>
        <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginLeft: '10px' }}>
          문의 하기
        </Typography>
        <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginLeft: '10px' }}>
          비밀번호 변경
        </Typography>
        <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginLeft: '10px' }}>
          회원정보 변경
        </Typography>
        <IoIosArrowForward
          style={{ marginLeft: '258px', color: '#538DFF', marginTop: '-25px', cursor: 'pointer' }}
          onClick={goToModifyPage}
        />
      </Box>
    </>
  );
};

export default MyPage;
