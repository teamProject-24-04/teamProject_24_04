import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box, Snackbar } from '@mui/material';
import { IoIosArrowBack } from 'react-icons/io';
import axios from 'axios';
import * as yup from 'yup';
import LoginPage from '../login/Login';

const schema = yup.object().shape({
  name: yup.string().required('이름을 입력하세요.'),
  nickname: yup.string().required('닉네임을 입력하세요.'),
  phoneNumber: yup.string().required('전화번호를 입력하세요.'),
  loginId: yup
    .string()
    .required('아이디를 입력하세요.')
    .matches(/^[a-zA-Z0-9]*$/, '영어와 숫자만 입력해주세요.'),
  loginPw: yup.string().required('비밀번호를 입력하세요.'),
  confirmLoginPw: yup
    .string()
    .required('비밀번호를 다시 입력하세요.')
    .oneOf([yup.ref('loginPw'), null], '비밀번호가 일치하지 않습니다.'),
});

const AddressFinder = ({
  setAddress,
  setZonecode,
  setRoadAddress,
  setJibunAddress,
  setLatitude,
  setLongitude,
}) => {
  const id = 'daum-postcode';
  const src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

  useEffect(() => {
    const loadLayout = () => {
      window.daum.postcode.load(() => {
        const postcode = new window.daum.Postcode({
          oncomplete: async function (data) {
            console.log(data);
            setAddress(data.address);
            setZonecode(data.zonecode); // 우편번호
            setRoadAddress(data.roadAddress); // 도로명주소
            setJibunAddress(data.jibunAddress); // 지번주소

            // 구글 지도 API 호출
            const coords = await getAddressCoords(data.roadAddress);
            setLatitude(coords.latitude);
            setLongitude(coords.longitude);
          },
        });

        // postcode.open() 호출을 스크립트 로드 후에 실행
        document.getElementById('openPostcode').addEventListener('click', () => {
          postcode.open();
        });
      });
    };

    const isAlready = document.getElementById(id);

    if (!isAlready) {
      const script = document.createElement('script');
      script.src = src;
      script.id = id;
      script.async = true; // 스크립트를 비동기적으로 로드
      script.onload = loadLayout; // 스크립트 로드 후 loadLayout 함수 실행
      document.body.append(script);
    }
  }, []);

  const getAddressCoords = async (address) => {
    const API_KEY = 'AIzaSyA_HAeMOsU8-4oVQP80VzX2HUBWrr_LeZ4';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address,
    )}&key=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const location = data.results[0].geometry.location;
    const latitude = location.lat;
    const longitude = location.lng;
    return { latitude, longitude };
  };

  return (
    <div className="App">
      <Button variant="contained" id="openPostcode">
        주소찾기
      </Button>
    </div>
  );
};

export default function Sign({ setShowSign }) {
  const [showLoginPage, setShowLoginPage] = useState(false);

  const goToLoginPage = () => {
    setShowLoginPage(true);
  };

  if (showLoginPage) {
    return <LoginPage setShowLoginPage={setShowLoginPage} />;
  }

  const goBack = () => {
    setShowSign(false);
  };

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [confirmLoginPw, setConfirmLoginPw] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [members, setMembers] = useState([]);
  const [errors, setErrors] = useState({
    name: '',
    nickname: '',
    phoneNumber: '',
    loginId: '',
    loginPw: '',
    confirmLoginPw: '',
    detailAddress: '',
  });
  const [address, setAddress] = useState('');
  const [zonecode, setZonecode] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [jibunAddress, setJibunAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [regDate, setRegDate] = useState('');
  const [authLevel] = useState(3); // 권한 레벨을 3으로 고정
  const [email, setEmail] = useState('');

  const setTodayAsRegDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    const formattedDate = `${year}.${month}.${day}`;

    setRegDate(formattedDate);
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    setTodayAsRegDate();
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('/api/member/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handleNicknameChange = (event) => {
    const newNickname = event.target.value;
    setNickname(newNickname);
  };

  const handlePhoneNumberChange = (event) => {
    const newPhoneNumber = event.target.value;
    setPhoneNumber(newPhoneNumber);
  };

  const handleDetailAddressChange = (event) => {
    const newDetailAddress = event.target.value;
    setDetailAddress(newDetailAddress);
  };

  const handleIdChange = (event) => {
    const newLoginId = event.target.value;
    setLoginId(newLoginId);
    const duplicateCheck = members.find((member) => member.loginId === newLoginId);
    if (duplicateCheck) {
      setIsDuplicate(true);
    } else {
      setIsDuplicate(false);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const newPassword = event.target.value;
    setConfirmLoginPw(newPassword);
    if (newPassword !== loginPw) {
      setErrors((prevState) => ({ ...prevState, confirmLoginPw: '비밀번호가 일치하지 않습니다.' }));
    } else {
      setErrors((prevState) => ({ ...prevState, confirmLoginPw: '' }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      schema
        .validate(
          {
            name,
            nickname,
            phoneNumber,
            loginId,
            loginPw,
            confirmLoginPw,
            detailAddress,
          },
          { abortEarly: false },
        )
        .then(() => {
          const duplicateCheck = members.find((member) => member.loginId === loginId);
          if (duplicateCheck) {
            setIsDuplicate(true);
            return;
          }
          axios
            .post('/api/member/signup', {
              name,
              nickname,
              phoneNumber,
              loginId,
              loginPw,
              zonecode,
              roadAddress,
              jibunAddress,
              latitude,
              longitude,
              detailAddress,
              regDate,
              authLevel, // 권한 레벨 추가
              email, // 이메일 추가
            })
            .then(() => {
              fetchMembers();
              setName('');
              setNickname('');
              setPhoneNumber('');
              setLoginId('');
              setLoginPw('');
              setConfirmLoginPw('');
              setZonecode('');
              setRoadAddress('');
              setJibunAddress('');
              setLatitude('');
              setLongitude('');
              setDetailAddress('');
              setEmail(''); // 이메일 초기화
              setSnackbarOpen(true);
              // 회원가입 성공 후 로그인 페이지로 이동
              // window.location.href = '/member/login';
              setShowSign(false);
            })
            .catch((error) => console.error('Error writing member:', error));
        })
        .catch((errors) => {
          errors.inner.forEach((err) => {
            if (err.path === 'name') {
              setErrors((prevState) => ({ ...prevState, name: err.message }));
            } else if (err.path === 'nickname') {
              setErrors((prevState) => ({ ...prevState, nickname: err.message }));
            } else if (err.path === 'phoneNumber') {
              setErrors((prevState) => ({ ...prevState, phoneNumber: err.message }));
            } else if (err.path === 'loginId') {
              setErrors((prevState) => ({ ...prevState, loginId: err.message }));
            } else if (err.path === 'loginPw') {
              setErrors((prevState) => ({ ...prevState, loginPw: err.message }));
            } else if (err.path === 'confirmLoginPw') {
              setErrors((prevState) => ({ ...prevState, confirmLoginPw: err.message }));
            }
          });
        });
    } catch (error) {
      console.error('Error writing member:', error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ bgcolor: '#FAE0D4', minHeight: '100vh', py: 4 }}>
      <Typography variant="h4" align="left" gutterBottom>
        그릴마스터
      </Typography>
      <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4, bgcolor: 'white', p: 3, borderRadius: 10 }}>
        <div>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IoIosArrowBack style={{ marginRight: '10px', fontSize: '30px' }} onClick={goBack} />
            <Typography variant="h4" align="left" gutterBottom>
              회원 가입
            </Typography>
          </Box>
          <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <TextField
              variant="outlined"
              label="아이디 입력"
              value={loginId}
              onChange={handleIdChange}
              fullWidth
              margin="normal"
              error={!!errors.loginId || isDuplicate}
              helperText={
                errors.loginId || (isDuplicate ? '중복된 아이디입니다.' : '아이디를 입력하세요.')
              }
              onKeyUp={(e) => {
                if (e.target.value.trim() === '') {
                  setErrors((prevState) => ({ ...prevState, loginId: '아이디를 입력하세요.' }));
                } else {
                  setErrors((prevState) => ({ ...prevState, loginId: '' }));
                }
              }}
            />
            <TextField
              variant="outlined"
              label="비밀번호 입력"
              type="password"
              value={loginPw}
              onChange={(e) => {
                setLoginPw(e.target.value);
                setErrors((prevState) => ({ ...prevState, loginPw: '' }));
              }}
              fullWidth
              margin="normal"
              error={!!errors.loginPw}
              helperText={errors.loginPw}
              onKeyUp={(e) => {
                if (e.target.value.trim() === '') {
                  setErrors((prevState) => ({ ...prevState, loginPw: '비밀번호를 입력하세요.' }));
                } else {
                  setErrors((prevState) => ({ ...prevState, loginPw: '' }));
                }
              }}
            />
            <TextField
              variant="outlined"
              label="비밀번호 확인"
              type="password"
              value={confirmLoginPw}
              onChange={handleConfirmPasswordChange}
              fullWidth
              margin="normal"
              error={!!errors.confirmLoginPw}
              helperText={errors.confirmLoginPw}
              onKeyUp={(e) => {
                if (e.target.value.trim() === '') {
                  setErrors((prevState) => ({
                    ...prevState,
                    confirmLoginPw: '비밀번호를 입력해주세요.',
                  }));
                } else {
                  setErrors((prevState) => ({ ...prevState, confirmLoginPw: '' }));
                }
              }}
            />
            <TextField
              variant="outlined"
              label="이름 입력"
              value={name}
              onChange={handleNameChange}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              variant="outlined"
              label="닉네임 입력"
              value={nickname}
              onChange={handleNicknameChange}
              fullWidth
              margin="normal"
              error={!!errors.nickname}
              helperText={errors.nickname}
            />
            <TextField
              variant="outlined"
              label="전화번호 입력"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              fullWidth
              margin="normal"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
            {/* 이메일 입력 필드 */}
            <TextField
              variant="outlined"
              label="이메일"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              fullWidth
              margin="normal"
            />
            {/* 권한 레벨 입력 필드 (읽기 전용) */}
            <TextField
              variant="outlined"
              label="권한 레벨"
              value={authLevel}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              style={{ display: 'none' }} // 숨기기
            />
            <AddressFinder
              setAddress={setAddress}
              setZonecode={setZonecode}
              setRoadAddress={setRoadAddress}
              setJibunAddress={setJibunAddress}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
            />
            <TextField
              variant="outlined"
              label="우편번호"
              value={zonecode}
              fullWidth
              margin="normal"
            />
            <TextField
              variant="outlined"
              label="도로명주소"
              value={roadAddress}
              fullWidth
              margin="normal"
            />
            <TextField
              variant="outlined"
              label="지번주소"
              value={jibunAddress}
              fullWidth
              margin="normal"
            />
            <TextField
              variant="outlined"
              label="상세 주소"
              value={detailAddress} // 입력된 상세 주소를 표시합니다.
              onChange={handleDetailAddressChange} // 상세 주소가 변경될 때마다 호출됩니다.
              fullWidth
              margin="normal"
            />
            <TextField
              variant="outlined"
              label="위도"
              value={latitude} // 위도 상태 표시
              fullWidth
              margin="normal"
              style={{ display: 'none' }}
            />
            <TextField
              variant="outlined"
              label="경도"
              value={longitude} // 경도 상태 표시
              fullWidth
              margin="normal"
              style={{ display: 'none' }}
            />
            <Button
              variant="outlined"
              type="submit"
              style={{ marginTop: '10px' }}
              disabled={
                !!errors.loginId || !!errors.loginPw || !!errors.confirmLoginPw || isDuplicate
              }>
              회원가입
            </Button>
          </form>
        </div>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarOpen}
        autoHideDuration={8000}
        onClose={handleSnackbarClose}
        message="회원가입이 완료되었습니다."
      />
    </Container>
  );
}
