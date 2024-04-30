'use client';

import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider, Button } from '@mui/material/';
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
import YouTube from 'react-youtube';
import { FaPlayCircle } from 'react-icons/fa';
import '../App.css';
import '../../globals.css';

function App() {
  const videos = [
    {
      id: 'dBEzkrcniLg',
      title: '고기의 끝, 텍사스 브리스킷',
      channel: '고기남자',
    },
    {
      id: 'fkV7U7jIgTA',
      title: '우대갈비의 끝',
      channel: '고기남자',
    },
    {
      id: 'q6DbnQOUnts',
      title: '풀드포크 바베큐는 집에서 하세요',
      channel: '고기남자',
    },
    {
      id: 'KXkOt0O4VnY',
      title: '평생 써먹는 통삼겹살 먹는 방법',
      channel: '고기남자',
    },
    {
      id: 'dEzMEjXSlgY',
      title: '삼겹살을 최대한 맛있게 먹는 법',
      channel: '고기남자',
    },
    // 추가 비디오...
  ];

  const [videoId, setVideoId] = useState(videos[0].id); // 첫 번째 비디오의 ID로 초기화

  const handlePlayVideo = (videoId) => {
    setVideoId(videoId);
  };

  const playVideoFullScreen = (videoId) => {
    if (typeof window !== 'undefined') {
      // 클라이언트 측에서만 실행
      const YouTube = require('react-youtube').default;
      const opts = {
        width: '100%',
        height: '270px',
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          loop: 1,
          playlist: videoId,
        },
      };
      return <YouTube videoId={videoId} opts={opts} />;
    }
    return null;
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
        <div style={{ marginTop: '5%', display: 'flex' }}>
          <IoIosArrowBack style={{ fontSize: '30px' }} />
          <div style={{ marginRight: 'auto', display: 'flex', flexDirection: 'column' }}>
            <p style={{ margin: '0', marginBottom: '5px' }}>인기 유튜버 레시피</p>
            <p style={{ margin: '0', marginTop: '15px' }}>고기의 끝, 텍사스 브리스킷</p>
            <p style={{ margin: '0', fontSize: '10px' }}>박태영(고기남자)</p>
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
        <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* 유튜브 비디오 목록 */}
          <Slider
            dots={false}
            infinite={true}
            speed={500}
            slidesToShow={3}
            slidesToScroll={3}
            arrows={true}
            autoplay={false}
            style={{ marginTop: '40px', width: '100%' }}>
            {videos.map((video, index) => (
              <div key={index} className="detail_img_slider">
                <div style={{ position: 'relative', cursor: 'pointer' }}>
                  <div
                    style={{
                      width: '100%',
                      height: '100px',
                      overflow: 'hidden',
                    }}>
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                      style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                      alt="video thumbnail"
                    />
                  </div>
                  <FaPlayCircle
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '48px',
                      color: 'white',
                    }}
                    onClick={() => handlePlayVideo(video.id)} // 수정된 부분
                  />
                </div>
                <p style={{ margin: '5px 0', fontSize: '14px', fontWeight: 'bold' }}>
                  {video.title}
                </p>
                <p style={{ margin: '0', fontSize: '12px' }}>{video.channel}</p>
              </div>
            ))}
          </Slider>
        </Container>
      </Container>
      {videoId && (
        <div style={{ marginTop: '20px' }}>
          <YouTube videoId={videoId} opts={{ width: '100%', height: '270px' }} />
        </div>
      )}
      <div style={{ fontSize: '12px', fontWeight: '500', marginTop: '20px' }}>
        <p>
          대한민국 136만명의 구독자를 보유한 요리 유튜버 자신의 얼굴을 드러내지 않고 오직 목소리와
          손동작으로 고기 요리를 진행한다. 항상 자신의 전완근을 어필하는 독특한 영상 썸네일을
          지향한다.
        </p>
        <p style={{ marginTop: '20px' }}>[레시피 소개]</p>
        <p>고기의 끝, 텍사스 브리스킷</p>
        <p style={{ marginTop: '20px' }}>우대갈비의 끝</p>
        <p style={{ marginTop: '20px' }}>폴드포크 바베큐는 집에서 하세요</p>
        <p style={{ marginTop: '20px' }}>평생 써먹는 통삼겹살 먹는 방법</p>
        <p style={{ marginTop: '20px' }}>삼겹살을 최대한 맛있게 먹는 법</p>
      </div>
      <Button
        style={{
          width: '100%',
          marginTop: '20px',
          position: 'fixed',
          zIndex: '1000',
          bottom: '0px',
        }}
        size="large"
        variant="contained">
        내 레시피에 추가하기
      </Button>
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
