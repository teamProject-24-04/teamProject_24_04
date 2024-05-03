import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';

import { Box, TextField, Button, Typography, Modal } from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
//modal
//모달창 스타일
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// modal 열기, 닫기
function useEditReplyModalStatus() {
  const [opened, setOpened] = React.useState(false);

  const open = () => {
    setOpened(true);
  };

  const close = () => {
    setOpened(false);
  };

  return {
    opened,
    open,
    close,
  };
}

const ReplyModal = ({ status }) => {
  return (
    <>
      <Modal
        open={status.opened}
        onClose={status.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            댓글 수정
          </Typography>
          <div>
            <TextField
              style={{ width: '100%' }}
              id="outlined-basic"
              label="댓글 수정"
              variant="outlined"
            />
            <Button variant="contained">수정하기</Button>
            <Button variant="contained" onClick={status.close}>
              수정취소
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

//modal 여기까지

const RecipyDetail = ({ noticeSnackbarStatus, repliesStatus }) => {
  const editReplyModalStatus = useEditReplyModalStatus();

  const test = () => {
    console.log(1);
    noticeSnackbarStatus.open('글이 작성되었습니다.', 'success');
  };

  const [content, setContent] = useState('');

  const contentChange = (event) => {
    setContent(event.target.value);
  };

  const write = async (event) => {
    event.preventDefault();
    repliesStatus.replyWrite(content);

    try {
      // 글 작성
      const response = await axios.post('/api/reply/write', {
        content: content,
      });

      // 성공 시 스낵바 메시지 표시
      noticeSnackbarStatus.open('글이 작성되었습니다.', 'success');
    } catch (error) {
      // 실패 시 스낵바 메시지 표시
      noticeSnackbarStatus.open('글 작성에 실패했습니다.', 'error');
    }
  };

  return (
    <>
      <ReplyModal status={editReplyModalStatus} />
      <div style={{ padding: '10px' }} className="title-box tw-flex tw-justify-between">
        <div>
          <ArrowBackIosNewIcon />
          <h1>회원 바베큐 레시피</h1>
          <h1>제목</h1>
          좋아요 수 : 10 댓글수 : 10
          <Button variant="contained">수정하기</Button>
          <Button variant="contained">삭제하기</Button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img
            style={{ width: '100px', Height: '100px', border: '2px solid red' }}
            src="https://picsum.photos/id/237/200/300"
          />
        </div>
      </div>
      <div className="img-box tw-border-2 tw-border-red-500 ">
        <ul className="tw-flex">
          <li style={{ marginLeft: '10px', marginRight: '10px' }}>
            <img src="https://picsum.photos/id/237/200/300" />
          </li>
          <li style={{ marginLeft: '10px', marginRight: '10px' }}>
            <img src="https://picsum.photos/id/237/200/300" />
          </li>
          <li style={{ marginLeft: '10px', marginRight: '10px' }}>
            <img src="https://picsum.photos/id/237/200/300" />
          </li>
        </ul>
      </div>

      <div className="content-box">내용</div>
      <div className="reply-box tw-p-[10px]">
        <ul>
          <li className="tw-flex tw-items-center">
            <img style={{ width: '50px', height: '50px', border: '2px solid red' }} src="" />
            <div style={{ marginLeft: '30px' }}>
              <h1>작성자 : 홍길동</h1>
              <h1>수정일 : 20204-04-30 09:07:17</h1>
              내용
              <div>
                <Button variant="contained">좋아요</Button>
                <Button variant="contained">싫어요</Button>
                <Button variant="contained">답글</Button>
                <Button variant="contained" onClick={editReplyModalStatus.open}>
                  수정
                </Button>
                <Button variant="contained">삭제</Button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <form action="" onSubmit={write} className="tw-flex">
          <TextField
            style={{ width: '100%' }}
            multiline
            name="content"
            autoComplete="off"
            label="댓글을 입력해주세요"
            value={content}
            onChange={contentChange}
          />
          <Button variant="contained" href="#contained-buttons" type="submit">
            작성
          </Button>
        </form>
      </div>

      <Button
        style={{ marginTop: '10px' }}
        variant="contained"
        className="tw-font-bold tw-w-full"
        type="submit">
        <FavoriteIcon />내 레시피에 추가하기
      </Button>
    </>
  );
};
export default RecipyDetail;
