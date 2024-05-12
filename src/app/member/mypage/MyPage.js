import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { IoPersonAdd, IoSettingsOutline } from 'react-icons/io5';
import { LuPencil } from 'react-icons/lu';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { LuBookCopy } from 'react-icons/lu';
import { FaPlus } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import MyPageModify from './MyPageModify';
import PasswordModal from './PasswordModal'; // PasswordModal 컴포넌트 import

const MyPage = () => {
  const [showModifyPage, setShowModifyPage] = useState(false);
  const [name, setName] = useState('');
  const [loginId, setLoginId] = useState('');
  const [regDate, setRegDate] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleWithdrawal = () => {
    setShowPasswordModal(true); // 회원 탈퇴 버튼 클릭 시 비밀번호 모달 열기
  };

  const handleConfirmWithdrawal = async (password) => {
    // async 키워드 추가
    // 비밀번호 확인 후 탈퇴 동작 수행
    // 이 곳에서 비밀번호를 서버로 보내고 인증을 수행한 후 탈퇴 동작을 수행합니다.
    console.log('비밀번호 확인:', password);
    const confirmWithdrawal = window.confirm('정말 탈퇴하시겠습니까?');
    if (confirmWithdrawal) {
      try {
        // 회원 탈퇴를 위한 API 요청
        const response = await axios.post('/api/member/delete', { loginId });
        console.log(response.data); // 탈퇴 처리 결과 확인
        // 탈퇴 후 로직 작성
      } catch (error) {
        console.error('Error withdrawing member:', error);
      }
    }
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm('로그아웃 하시겠습니까?'); // 확인 대화상자 표시
    if (isConfirmed) {
      window.location.href = '/member/logout'; // 페이지 이동
    }
  };

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
    const storedloginId = localStorage.getItem('loginId');
    if (storedloginId) {
      setLoginId(storedloginId);
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
    return <MyPageModify setShowModifyPage={setShowModifyPage} />;
  }
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: '2px',
        }}>
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
      <Box sx={{ display: 'flex', marginTop: '20px', marginLeft: '18px', width: '365px' }}>
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
            width={120}
            backgroundColor="#ACB9D1"
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            borderRadius={1}
            sx={{ border: '2px solid grey', whiteSpace: 'nowrap' }}>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
              회원 가입일
              <Typography>{regDate}</Typography>
            </Typography>
          </Box>
          <Box
            marginLeft={1}
            height={50}
            width={120}
            backgroundColor="#ACB9D1"
            my={1}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            borderRadius={1}
            sx={{ border: '2px solid grey' }}>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
              레시피 수<Typography>5개</Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
      <div style={{ display: 'flex' }}>
        <Box
          height={130}
          width={190}
          backgroundColor="#ACB9D1"
          marginLeft={2}
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
          width={150}
          backgroundColor="#ACB9D1"
          my={4}
          sx={{ border: '2px solid grey' }}
          borderRadius={1}>
          <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginLeft: '10px' }}>
            나의 쇼핑
          </Typography>
          <FiShoppingCart style={{ fontSize: '50px', marginTop: '20px', marginLeft: '30px' }} />
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
        marginLeft={2}
        backgroundColor="#D9D9D9"
        sx={{ border: '2px solid grey' }}
        borderRadius={1}>
        <div
          style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', marginTop: '20px' }}>
          <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
            좋아요 한 레시피
          </Typography>
          <IoIosArrowForward
            style={{
              marginLeft: '180px',
              color: '#538DFF',
              fontSize: '20px', // 아이콘 크기 조정
            }}
            onClick={goToModifyPage}
          />
        </div>
        <div
          style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', marginTop: '30px' }}>
          <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
            좋아요 한 유튜버
          </Typography>
          <IoIosArrowForward
            style={{
              marginLeft: '180px',
              color: '#538DFF',
              fontSize: '20px', // 아이콘 크기 조정
            }}
            onClick={goToModifyPage}
          />
        </div>
      </Box>

      <Box
        height={130}
        width={360}
        marginLeft={2}
        my={2}
        backgroundColor="#D9D9D9"
        sx={{
          border: '2px solid grey',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        borderRadius={1}>
        <div
          style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', marginTop: '10px' }}>
          <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
            로그아웃
          </Typography>
          <IoIosArrowForward
            style={{
              marginLeft: '236px',
              color: '#538DFF',
              fontSize: '20px', // 아이콘 크기 조정
            }}
            onClick={handleLogout}
          />
        </div>
        <div
          style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', marginTop: '10px' }}>
          <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
            회원 탈퇴
          </Typography>
          <IoIosArrowForward
            style={{
              marginLeft: '233px',
              color: '#538DFF',
              fontSize: '20px', // 아이콘 크기 조정
            }}
            onClick={handleWithdrawal}
          />
          <PasswordModal
            open={showPasswordModal}
            onClose={() => setShowPasswordModal(false)}
            onConfirm={handleConfirmWithdrawal}
          />
        </div>
        <div
          style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', marginTop: '10px' }}>
          <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
            회원정보 변경
          </Typography>
          <IoIosArrowForward
            style={{
              marginLeft: '200px',
              color: '#538DFF',
              fontSize: '20px', // 아이콘 크기 조정
            }}
            onClick={goToModifyPage}
          />
        </div>
      </Box>
    </div>
  );
};

export default MyPage;
