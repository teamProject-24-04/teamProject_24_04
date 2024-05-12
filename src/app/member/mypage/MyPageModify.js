import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import * as yup from 'yup';
import { IoIosArrowBack } from 'react-icons/io';
import { useHistory } from 'react-router-dom'; // react-router-dom에서 useHistory import

const schema = yup.object().shape({
  name: yup.string().required('이름을 입력하세요.'),
  nickname: yup.string().required('닉네임을 입력하세요.'),
  phoneNumber: yup.string().required('전화번호를 입력하세요.'),
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

const MyPageModify = ({ setShowModifyPage }) => {
  const goBack = () => {
    setShowModifyPage(false);
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
  const [authlevel, setAuthlevel] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedLoginId = localStorage.getItem('loginId');
    const storedName = localStorage.getItem('name');
    const storedNickname = localStorage.getItem('nickname');
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    const storedAddress = localStorage.getItem('address');
    const storedRoadAddress = localStorage.getItem('roadAddress');
    const storedJibunAddress = localStorage.getItem('jibunAddress');
    const storedLatitude = localStorage.getItem('latitude');
    const storedLongitude = localStorage.getItem('longitude');
    const storedDetailAddress = localStorage.getItem('detailAddress');
    const storedEamil = localStorage.getItem('email');
    const storedAuthLevel = localStorage.getItem('authlevel');

    // 가져온 값들을 state 변수들에 설정
    if (storedName) setName(storedName);
    if (storedNickname) setNickname(storedNickname);
    if (storedPhoneNumber) setPhoneNumber(storedPhoneNumber);
    if (storedLoginId) setLoginId(storedLoginId);
    if (storedDetailAddress) setDetailAddress(storedDetailAddress);
    if (storedAddress) setZonecode(storedAddress);
    if (storedRoadAddress) setRoadAddress(storedRoadAddress);
    if (storedJibunAddress) setJibunAddress(storedJibunAddress);
    if (storedLatitude) setLatitude(storedLatitude);
    if (storedLongitude) setLongitude(storedLongitude);
    if (storedEamil) setEmail(storedEamil);
    if (storedAuthLevel) setAuthlevel(storedAuthLevel);

    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('/api/member/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', 에러입니다);
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
          if (loginPw !== confirmLoginPw) {
            setErrors((prevState) => ({
              ...prevState,
              confirmLoginPw: '비밀번호가 일치하지 않습니다.',
            }));
            return;
          }
          axios
            .post('/api/member/modify', {
              name,
              nickname,
              phoneNumber,
              loginId,
              loginPw,
              email,
              zonecode,
              roadAddress,
              jibunAddress,
              latitude,
              longitude,
              detailAddress,
              authlevel,
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
              handleSignupSuccess();
              setDetailAddress('');
              setEmail('');
              setAuthlevel(3);
            })
            .catch((error) => console.error('Error writing member:', error));
        })
        .catch((error) => {
          console.error('Error validating form:', error);
          error.inner.forEach((err) => {
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
      console.error('Error submitting form:', error);
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
    window.location.href = '/member/logout'; // 회원가입 성공 후 페이지 이동
  };

  return (
    <>
      <Container maxWidth="md">
        <div>
          <IoIosArrowBack style={{ marginRight: '10px' }} onClick={goBack} />

          <Typography variant="h4" align="left" gutterBottom>
            그릴마스터
          </Typography>

          <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <TextField
              variant="outlined"
              label="아이디 입력"
              value={loginId}
              fullWidth
              margin="normal"
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
              fullWidth
              margin="normal"
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
              value={authlevel}
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
              disabled={!!errors.loginPw || !!errors.confirmLoginPw || isDuplicate}>
              정보 수정
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default MyPageModify;
