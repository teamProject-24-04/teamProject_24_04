'use client';
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Snackbar,
} from '@mui/material';
import axios from 'axios';
import * as yup from 'yup';

const schema = yup.object().shape({
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

export default function Page() {
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [confirmLoginPw, setConfirmLoginPw] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [members, setMembers] = useState([]);
  const [errors, setErrors] = useState({
    loginId: '',
    loginPw: '',
    confirmLoginPw: '',
  });
  const [address, setAddress] = useState('');
  const [zonecode, setZonecode] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [jibunAddress, setJibunAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
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
        .validate({ loginId, loginPw, confirmLoginPw }, { abortEarly: false })
        .then(() => {
          const duplicateCheck = members.find((member) => member.loginId === loginId);
          if (duplicateCheck) {
            setIsDuplicate(true);
            return;
          }
          axios
            .post('/api/member/signup', {
              loginId,
              loginPw,
              zonecode,
              roadAddress,
              jibunAddress,
              latitude,
              longitude,
            })
            .then(() => {
              fetchMembers();
              setLoginId('');
              setLoginPw('');
              setZonecode('');
              setRoadAddress('');
              setJibunAddress('');
              setLatitude('');
              setLongitude('');
              handleSignupSuccess();
            })
            .catch((error) => console.error('Error writing member:', error));
        })
        .catch((errors) => {
          errors.inner.forEach((err) => {
            if (err.path === 'loginId') {
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

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSignupSuccess = () => {
    handleSnackbarOpen();
    // 회원가입 성공 후 페이지 이동
    window.location.href = '/member/mypage'; // 페이지 이동
  };

  return (
    <Container maxWidth="md">
      <div>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="회원가입이 성공했습니다."
      />
    </Container>
  );
}
