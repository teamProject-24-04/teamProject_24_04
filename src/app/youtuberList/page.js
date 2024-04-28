'use client';

import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import { Container, ButtonGroup, Button } from '@mui/material';
import RootTheme from '../theme';
import Slider from 'react-slick';
import { MdLocalFireDepartment } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa';
import './App.css';
import '../globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  const [isPressed1, setIsPressed1] = useState(true);
  const [isPressed2, setIsPressed2] = useState(false);

  const handleButtonClick1 = () => {
    setIsPressed1(true);
    setIsPressed2(false);
  };

  const handleButtonClick2 = () => {
    setIsPressed1(false);
    setIsPressed2(true);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 9,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Container>
        <CiSearch
          style={{
            marginLeft: 'auto',
            fontSize: '30px',
            marginTop: '20px',
          }}
        />
        <div style={{ marginTop: '5%', display: 'flex', alignItems: 'center' }}>
          <MdLocalFireDepartment
            style={{ marginRight: '5px', verticalAlign: 'bottom', fontSize: '24px', color: 'red' }}
          />
          <p>인기 유튜버 레시피</p>
        </div>
        <Slider {...settings} style={{ marginTop: '5%' }}>
          <div className="image-container">
            <img
              src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAxMTFfNTIg%2FMDAxNzA0OTQ0MjMxNzE2.Wbx2U8JUNvX8AMICUP1yhJTfAr6meUJ-GXAM5BT3Yccg.T1xkyO4diCOE95Tai073Fs153sYm0jNvTuUdKtGEjNog.JPEG.7hansollee%2Fgfgdfgdffg.JPG&type=sc960_832"
              alt=""
            />
            <p>고기남자</p>
          </div>
          <div className="image-container">
            <img
              src="https://i.namu.wiki/i/nQJW2e_q6_y8kEDDoQQm-uqQxcp9kdpEt5GXcdPj5KFGiHLfz5OYnWztz2FYImuC-3S6lUxX7undv90l_8_jPg.webp"
              alt=""
            />
            <p>육식맨</p>
          </div>
          <div className="image-container">
            <img
              src="https://cdn.class101.net/images/ff5fbbb5-35a7-4fee-8540-35a0a120066e"
              alt=""
            />
            <p>정육왕</p>
          </div>
          <div className="image-container">
            <img src="https://dimg.donga.com/wps/NEWS/IMAGE/2018/10/23/92539689.2.jpg" alt="" />
            <p>백종원</p>
          </div>
          <div className="image-container">
            <img
              src="https://i.namu.wiki/i/Xp4MMRlKcjkKf5CNoTmUcUjUL5VFfg9FvvWpT4U1XdXgSHqA1K5g2u3HT-n_3aJcsVufREe3GBTw3NBcUPab2g.webp"
              alt=""
            />
            <p>승우아빠</p>
          </div>
          <div className="image-container">
            <img
              src="https://i.namu.wiki/i/LWNmFEecKVs4e0rXZS52gnDvzSZ-PUfNh6zGZCD-1XCLR2bRRX-cpnUGv9KvqvaJLtPTDQPVfCkXgbdHGV0C4Nkr8-a8U-bfITZpgcmrmxPHFDPEQh7aFb-XYFQDo7uhlGmBq0nGJRCF7XAjOF-F3w.webp"
              alt=""
            />
            <p>취요남</p>
          </div>
          <div className="image-container">
            <img
              src="https://americanmeat.co.kr/wp-content/uploads/2020/09/USMEF_%EB%AC%B8%EC%B8%A0101%ED%81%B4%EB%A0%88%EC%8A%A4_img1-1024x1024.png"
              alt=""
            />
            <p>문츠</p>
          </div>
        </Slider>
      </Container>
      <div style={{ display: 'flex', width: '100%', marginTop: '5%' }}>
        <div style={{ width: '50%', flexGrow: 1 }}>
          <ButtonGroup disableElevation variant="contained" fullWidth>
            <Button
              style={{
                borderRadius: 0,
                backgroundColor: isPressed1 ? '#888' : '#fff',
                color: '#000',
                boxShadow: isPressed1 ? '2px 2px 5px rgba(0, 0, 0, 0.3)' : 'none',
                textAlign: 'left',
              }}
              onClick={handleButtonClick1}>
              <span
                style={{ fontSize: '110%', fontWeight: 'bold', lineHeight: '1.2', padding: '0' }}>
                인기 유튜버 레시피 <br />
                <span
                  style={{ fontSize: '50%', fontWeight: 'bold', lineHeight: '1.2', padding: '0' }}>
                  완벽한 바베큐를 위한 유튜버들의 레시피
                </span>
              </span>
            </Button>
          </ButtonGroup>
        </div>
        <div style={{ width: '50%', flexGrow: 1 }}>
          <ButtonGroup disableElevation variant="contained" fullWidth>
            <Button
              style={{
                borderRadius: 0,
                backgroundColor: isPressed2 ? '#888' : '#fff',
                color: '#000',
                boxShadow: isPressed2 ? '2px 2px 5px rgba(0, 0, 0, 0.3)' : 'none',
                textAlign: 'left',
              }}
              onClick={handleButtonClick2}>
              <span
                style={{ fontSize: '110%', fontWeight: 'bold', lineHeight: '1.2', padding: '0' }}>
                회원 바베큐 레시피 <br />
                <span
                  style={{ fontSize: '50%', fontWeight: 'bold', lineHeight: '1.2', padding: '0' }}>
                  완벽한 바베큐를 위한 회원들의 레시피
                </span>
              </span>
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className="youtuber_recipe" style={{ display: isPressed1 ? 'block' : 'none' }}>
        <div className="recipe_list">
          <img
            src="https://americanmeat.co.kr/wp-content/uploads/2020/09/USMEF_%EB%AC%B8%EC%B8%A0101%ED%81%B4%EB%A0%88%EC%8A%A4_img1-1024x1024.png"
            alt=""
          />
          <div className="recipe_info">
            <p>문츠</p>
            <p>유튜브 제목 들어갈 자리</p>
            <div className="views">
              <FaUser />
              <span>500</span>
            </div>
          </div>
        </div>
        <div className="recipe_list">
          <img
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAxMTFfNTIg%2FMDAxNzA0OTQ0MjMxNzE2.Wbx2U8JUNvX8AMICUP1yhJTfAr6meUJ-GXAM5BT3Yccg.T1xkyO4diCOE95Tai073Fs153sYm0jNvTuUdKtGEjNog.JPEG.7hansollee%2Fgfgdfgdffg.JPG&type=sc960_832"
            alt=""
          />
          <div className="recipe_info">
            <p>고기남자</p>
            <p>유튜브 제목 들어갈 자리</p>
            <div className="views">
              <FaUser />
              <span>500</span>
            </div>
          </div>
        </div>
        <div className="recipe_list">
          <img src="https://cdn.class101.net/images/ff5fbbb5-35a7-4fee-8540-35a0a120066e" alt="" />
          <div className="recipe_info">
            <p>정육왕</p>
            <p>유튜브 제목 들어갈 자리</p>
            <div className="views">
              <FaUser />
              <span>500</span>
            </div>
          </div>
        </div>
        <div className="recipe_list">
          <img
            src="https://i.namu.wiki/i/nQJW2e_q6_y8kEDDoQQm-uqQxcp9kdpEt5GXcdPj5KFGiHLfz5OYnWztz2FYImuC-3S6lUxX7undv90l_8_jPg.webp"
            alt=""
          />
          <div className="recipe_info">
            <p>육식맨</p>
            <p>유튜브 제목 들어갈 자리</p>
            <div className="views">
              <FaUser />
              <span>500</span>
            </div>
          </div>
        </div>
        <div className="recipe_list">
          <img
            src="https://i.namu.wiki/i/Xp4MMRlKcjkKf5CNoTmUcUjUL5VFfg9FvvWpT4U1XdXgSHqA1K5g2u3HT-n_3aJcsVufREe3GBTw3NBcUPab2g.webp"
            alt=""
          />
          <div className="recipe_info">
            <p>승우아빠</p>
            <p>유튜브 제목 들어갈 자리</p>
            <div className="views">
              <FaUser />
              <span>500</span>
            </div>
          </div>
        </div>
        <div className="recipe_list">
          <img
            src="https://i.namu.wiki/i/LWNmFEecKVs4e0rXZS52gnDvzSZ-PUfNh6zGZCD-1XCLR2bRRX-cpnUGv9KvqvaJLtPTDQPVfCkXgbdHGV0C4Nkr8-a8U-bfITZpgcmrmxPHFDPEQh7aFb-XYFQDo7uhlGmBq0nGJRCF7XAjOF-F3w.webp"
            alt=""
          />
          <div className="recipe_info">
            <p>취요남</p>
            <p>유튜브 제목 들어갈 자리</p>
            <div className="views">
              <FaUser />
              <span>500</span>
            </div>
          </div>
        </div>
        <div className="recipe_list">
          <img src="https://dimg.donga.com/wps/NEWS/IMAGE/2018/10/23/92539689.2.jpg" alt="" />
          <div className="recipe_info">
            <p>백종원</p>
            <p>유튜브 제목 들어갈 자리</p>
            <div className="views">
              <FaUser />
              <span>500</span>
            </div>
          </div>
        </div>
      </div>
      <div className="member_recipe" style={{ display: isPressed1 ? 'none' : 'block' }}>
        <div className="recipe_list">
          <img
            src="https://americanmeat.co.kr/wp-content/uploads/2020/09/USMEF_%EB%AC%B8%EC%B8%A0101%ED%81%B4%EB%A0%88%EC%8A%A4_img1-1024x1024.png"
            alt=""
          />
          <div className="recipe_info">
            <p>문츠</p>
            <p>유튜브 제목 들어갈 자리</p>
            <div className="views">
              <FaUser />
              <span>500</span>
            </div>
          </div>
        </div>
        <div className="recipe_list">
          <img
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAxMTFfNTIg%2FMDAxNzA0OTQ0MjMxNzE2.Wbx2U8JUNvX8AMICUP1yhJTfAr6meUJ-GXAM5BT3Yccg.T1xkyO4diCOE95Tai073Fs153sYm0jNvTuUdKtGEjNog.JPEG.7hansollee%2Fgfgdfgdffg.JPG&type=sc960_832"
            alt=""
          />
          <div className="recipe_info">
            <p>고기남자</p>
            <p>유튜브 제목 들어갈 자리</p>
            <div className="views">
              <FaUser />
              <span>500</span>
            </div>
          </div>
        </div>
        <div className="recipe_list">
          <img src="https://cdn.class101.net/images/ff5fbbb5-35a7-4fee-8540-35a0a120066e" alt="" />
          <div className="recipe_info">
            <p>정육왕</p>
            <p>유튜브 제목 들어갈 자리</p>
            <div className="views">
              <FaUser />
              <span>500</span>
            </div>
          </div>
        </div>
        <div className="recipe_list">
          <img
            src="https://i.namu.wiki/i/nQJW2e_q6_y8kEDDoQQm-uqQxcp9kdpEt5GXcdPj5KFGiHLfz5OYnWztz2FYImuC-3S6lUxX7undv90l_8_jPg.webp"
            alt=""
          />
          <div className="recipe_info">
            <p>육식맨</p>
            <p>유튜브 제목 들어갈 자리</p>
            <div className="views">
              <FaUser />
              <span>500</span>
            </div>
          </div>
        </div>
        <div className="recipe_list">
          <img
            src="https://i.namu.wiki/i/Xp4MMRlKcjkKf5CNoTmUcUjUL5VFfg9FvvWpT4U1XdXgSHqA1K5g2u3HT-n_3aJcsVufREe3GBTw3NBcUPab2g.webp"
            alt=""
          />
          <div className="recipe_info">
            <p>승우아빠</p>
            <p>유튜브 제목 들어갈 자리</p>
            <div className="views">
              <FaUser />
              <span>500</span>
            </div>
          </div>
        </div>
        <div className="recipe_list">
          <img
            src="https://i.namu.wiki/i/LWNmFEecKVs4e0rXZS52gnDvzSZ-PUfNh6zGZCD-1XCLR2bRRX-cpnUGv9KvqvaJLtPTDQPVfCkXgbdHGV0C4Nkr8-a8U-bfITZpgcmrmxPHFDPEQh7aFb-XYFQDo7uhlGmBq0nGJRCF7XAjOF-F3w.webp"
            alt=""
          />
          <div className="recipe_info">
            <p>취요남</p>
            <p>유튜브 제목 들어갈 자리</p>
            <div className="views">
              <FaUser />
              <span>500</span>
            </div>
          </div>
        </div>
        <div className="recipe_list">
          <img src="https://dimg.donga.com/wps/NEWS/IMAGE/2018/10/23/92539689.2.jpg" alt="" />
          <div className="recipe_info">
            <p>백종원</p>
            <p>유튜브 제목 들어갈 자리</p>
            <div className="views">
              <FaUser />
              <span>500</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function themeApp() {
  const theme = RootTheme();

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  );
}
