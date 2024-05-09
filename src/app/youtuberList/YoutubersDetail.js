import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material/';
import axios from 'axios';
import { Container } from '@mui/material';
import { CiSearch } from 'react-icons/ci';
import { useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { HiUsers } from 'react-icons/hi2';
import { FaHeart } from 'react-icons/fa';
import { FaPlayCircle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import YouTube from 'react-youtube';
import './App.css';
import '../globals.css';

function YoutubersDetail() {
  const { id } = useParams();
  const [youtuber, setYoutuber] = useState(null);
  const [videos, setVideos] = useState([]);
  const [videoId, setVideoId] = useState('');
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    async function fetchYoutuberDetail() {
      try {
        const response = await axios.post('/api/youtuberDetail', { id }); // Send ID in request body
        setYoutuber(response.data);
      } catch (error) {
        console.error('Error fetching youtuber detail:', error);
      }
    }
    fetchYoutuberDetail();
  }, [id]);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const response = await axios.post('/api/videos', { id }); // Send ID in request body
        setVideos(response.data);
        // 첫 번째 비디오를 초기 선택된 비디오로 설정합니다.
        if (response.data.length > 0) {
          setVideoId(response.data[0].video_id); // Fix the key name here
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    }
    fetchVideo();
  }, [id]);

  if (!youtuber) {
    return <div>Loading...</div>;
  }

  const handlePlayVideo = (videoId) => {
    setVideoId(videoId);
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
          <div>
            <IoIosArrowBack style={{ fontSize: '30px', cursor: 'pointer' }} onClick={goBack} />
          </div>
          <div style={{ marginRight: 'auto', display: 'flex', flexDirection: 'column' }}>
            <p style={{ margin: '0', marginBottom: '5px' }}>인기 유튜버 레시피</p>
            <p style={{ margin: '0', marginTop: '15px' }}>{youtuber.content_name}</p>
            <p style={{ margin: '0', fontSize: '10px' }}>{youtuber.fullName}</p>
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
              src={youtuber.img_url}
              alt={youtuber.name}
              style={{ width: '120px', height: '120px', objectFit: 'cover' }}
            />
          </div>
        </div>
        <Container>
          {/* 기존 UI 레이아웃 JSX */}
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
                      src={`https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`}
                      style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                      alt="비디오 썸네일"
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
                    onClick={() => handlePlayVideo(video.video_id)}
                  />
                </div>
                <p style={{ margin: '5px 0', fontSize: '8px', fontWeight: 'bold' }}>
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
      <div style={{ fontSize: '12px', fontWeight: '500', marginTop: '20px', marginBottom: '40px' }}>
        <p>{youtuber.body}</p>
        <br />
        <p>[레시피 소개]</p>
        <br />
        {[youtuber.title1, youtuber.title2, youtuber.title3, youtuber.title4, youtuber.title5].map(
          (title, index) => (
            <React.Fragment key={index}>
              <br />
              <p>{title}</p>
            </React.Fragment>
          ),
        )}
      </div>
      <Button
        style={{
          width: '93%',
          marginTop: '20px',
          position: 'fixed',
          zIndex: '1000',
          bottom: '60px',
        }}
        size="large"
        variant="contained">
        내 레시피에 추가하기
      </Button>
    </>
  );
}

export default YoutubersDetail;
