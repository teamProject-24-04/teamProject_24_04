'use client';
import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import RootTheme from './theme';

import { Button, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
function App() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {/* 상단 */}
      <div className="tw-flex tw-items-center" style={{ border: '2px solid red' }}>
        <div style={{ width: '70%', border: '2px solid red' }}>
          <Button>
            <ArrowBackIcon />
            게시판으로 이동
          </Button>
          <h1>제목</h1>
          <h1>작성일</h1>
          <Button>
            <FavoriteIcon></FavoriteIcon>
            {'10'}
          </Button>
          <InsertCommentIcon></InsertCommentIcon>
          {'10'}
          <Button variant="contained">수정</Button>
          <Button variant="contained">삭제</Button>
        </div>
        <div style={{ width: '30%', border: '2px solid red' }}>
          <img
            style={{ height: '100px', width: '100px', borderRadius: '5%' }}
            src="https://picsum.photos/id/237/200/300"
          />
        </div>
      </div>
      {/* 내용부분 */}
      <div style={{ display: 'flex', overflowX: 'auto', padding: '10px' }}>
        <img
          src="https://picsum.photos/id/237/200/300"
          style={{ marginLeft: '10px', marginRight: '10px' }}
        />
        <img
          src="https://picsum.photos/id/237/200/300"
          style={{ marginLeft: '10px', marginRight: '10px' }}
        />
        <img
          src="https://picsum.photos/id/237/200/300"
          style={{ marginLeft: '10px', marginRight: '10px' }}
        />
        <img
          src="https://picsum.photos/id/237/200/300"
          style={{ marginLeft: '10px', marginRight: '10px' }}
        />
      </div>

      <div style={{ padding: '10px', border: '2px solid red', margin: '20px 0' }}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est incidunt quisquam delectus
          sed aliquid voluptatem culpa assumenda maiores ea dicta exercitationem minima mollitia aut
          blanditiis aspernatur, error voluptatum dolores quos!
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h1>댓글</h1>
        <ul>
          <li className="tw-flex tw-items-center">
            <img
              style={{ width: '100px', height: '100px', borderRadius: '100%' }}
              src="https://picsum.photos/id/237/200/300"
            />
            <div style={{ border: '2px solid red', width: '70%' }}>
              <h1>회원1</h1>
              <h1>너무 맜있겟다</h1>
              <h1>2024.04.25 11:07</h1>
              <Button variant="contained">답글</Button>
              <Button variant="contained">수정</Button>
              <Button variant="contained">삭제</Button>
            </div>
          </li>
          <li className="tw-flex tw-items-center">
            <img
              style={{ width: '100px', height: '100px', borderRadius: '100%' }}
              src="https://picsum.photos/id/237/200/300"
            />
            <div style={{ border: '2px solid red', width: '70%' }}>
              <h1>회원1</h1>
              <h1>너무 맜있겟다</h1>
              <h1>2024.04.25 11:07</h1>
              <Button variant="contained">답글</Button>
              <Button variant="contained">수정</Button>
              <Button variant="contained">삭제</Button>
            </div>
          </li>
          <li className="tw-flex tw-items-center">
            <img
              style={{ width: '100px', height: '100px', borderRadius: '100%' }}
              src="https://picsum.photos/id/237/200/300"
            />
            <div style={{ border: '2px solid red', width: '70%' }}>
              <h1>회원1</h1>
              <h1>너무 맜있겟다</h1>
              <h1>2024.04.25 11:07</h1>
              <Button variant="contained">답글</Button>
              <Button variant="contained">수정</Button>
              <Button variant="contained">삭제</Button>
            </div>
          </li>
          <li className="tw-flex tw-items-center">
            <img
              style={{ width: '100px', height: '100px', borderRadius: '100%' }}
              src="https://picsum.photos/id/237/200/300"
            />
            <div style={{ border: '2px solid red', width: '70%' }}>
              <h1>회원1</h1>
              <h1>너무 맜있겟다</h1>
              <h1>2024.04.25 11:07</h1>
              <Button variant="contained">답글</Button>
              <Button variant="contained">수정</Button>
              <Button variant="contained">삭제</Button>
            </div>
          </li>
          <li className="tw-flex tw-items-center">
            <img
              style={{ width: '100px', height: '100px', borderRadius: '100%' }}
              src="https://picsum.photos/id/237/200/300"
            />
            <div style={{ border: '2px solid red', width: '70%' }}>
              <h1>회원1</h1>
              <h1>너무 맜있겟다</h1>
              <h1>2024.04.25 11:07</h1>
              <Button variant="contained">답글</Button>
              <Button variant="contained">수정</Button>
              <Button variant="contained">삭제</Button>
            </div>
          </li>
        </ul>
      </div>
      <div style={{ height: '100px' }}></div>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          backgroundColor: 'white',
        }}>
        <form action="">
          <TextField style={{ width: '100%' }} id="outlined-basic" label="댓글 작성" />
          <Button style={{ width: '100%' }} variant="contained" type="submit">
            댓글 작성
          </Button>
        </form>
      </div>
    </>
  );
}

export default function themeApp() {
  const theme = RootTheme();

  return <App />;
}
