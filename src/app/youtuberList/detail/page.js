'use client';

import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoIosArrowBack } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HiUsers } from 'react-icons/hi2';
import { FaHeart } from 'react-icons/fa';
import RootTheme from '../../theme';
import YouTube, { YouTubeProps } from 'react-youtube';
import '../App.css';
import '../../globals.css';
function App() {
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
        <div style={{ marginTop: '5%', display: 'flex' }}>
          <IoIosArrowBack style={{ fontSize: '30px' }} />
          <div style={{ marginRight: 'auto', display: 'flex', flexDirection: 'column' }}>
            <p style={{ margin: '0', marginBottom: '5px' }}>인기 유튜버 레시피</p>
            <p style={{ margin: '0', marginTop: '15px' }}>고기의 끝, 텍사스 브리스킷</p>
            <p style={{ margin: '0', fontSize: '10px' }}>유튜브(고기남자)</p>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5%' }}>
              <FaHeart style={{ color: 'red', fontSize: '15px' }} />
              <span style={{ marginLeft: '5px' }}>100</span> {/* 좋아요 숫자 표시 */}
              <HiUsers style={{ marginLeft: '5%', fontSize: '18px' }} />
              <span style={{ marginLeft: '5px' }}>100</span> {/* 좋아요 숫자 표시 */}
            </div>
          </div>
          <div
            className="profile-container"
            style={{ borderRadius: '20%', overflow: 'hidden', width: '120px', height: '120px' }}>
            <img
              src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAxMTFfNTIg%2FMDAxNzA0OTQ0MjMxNzE2.Wbx2U8JUNvX8AMICUP1yhJTfAr6meUJ-GXAM5BT3Yccg.T1xkyO4diCOE95Tai073Fs153sYm0jNvTuUdKtGEjNog.JPEG.7hansollee%2Fgfgdfgdffg.JPG&type=sc960_832"
              alt=""
              style={{ width: '120px', height: '120px', objectFit: 'cover' }}
            />
          </div>
        </div>
        <div
          style={{
            width: '100%',
            marginTop: '5%',
          }}>
          <Slider
            dots={false}
            infinite={true}
            speed={500}
            slidesToShow={3}
            slidesToScroll={3}
            arrows={true}
            autoplay={false}>
            <div className="detail_img_slider">
              <img
                src="https://picsum.photos/id/237/120/120"
                style={{ marginLeft: '10px', marginRight: '10px', flexShrink: 0 }}
              />
            </div>
            <div className="detail_img_slider">
              <img
                src="https://picsum.photos/id/238/120/120"
                style={{ marginLeft: '10px', marginRight: '10px', flexShrink: 0 }}
              />
            </div>
            <div className="detail_img_slider">
              <img
                src="https://picsum.photos/id/239/120/120"
                style={{ marginLeft: '10px', marginRight: '10px', flexShrink: 0 }}
              />
            </div>
            <div className="detail_img_slider">
              <img
                src="https://picsum.photos/id/240/120/120"
                style={{ marginLeft: '10px', marginRight: '10px', flexShrink: 0 }}
              />
            </div>
            <div className="detail_img_slider">
              <img
                src="https://picsum.photos/id/241/120/120"
                style={{ marginLeft: '10px', marginRight: '10px', flexShrink: 0 }}
              />
            </div>
            <div className="detail_img_slider">
              <img
                src="https://picsum.photos/id/242/120/120"
                style={{ marginLeft: '10px', marginRight: '10px', flexShrink: 0 }}
              />
            </div>
          </Slider>
        </div>
        <div>
          <iframe
            width="100%"
            src="//www.youtube.com/embed/ubGpDoyJvmI"
            frameborder="0"
            allowfullscreen></iframe>
        </div>
      </Container>
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
