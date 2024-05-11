import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Box, TextField, Button, Typography, Modal } from '@mui/material';
import { Link } from 'react-router-dom';
import useRepliesStatus from '../../reply/replyStatus';
import useArticlesStatus from '../../recipy/RecipyStatus';
import { useHistory } from 'react-router-dom';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

//modal
//모달창 스타일
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
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

const ReplyModal = ({ status, noticeSnackbarStatus, repliesStatus, replyId }) => {
  const close = () => {
    status.close();
    noticeSnackbarStatus.open('댓글 수정 취소됨', 'error');
  };

  const modify = async (id, content) => {
    try {
      await axios.post('/api/reply/modify', { id, content });
      noticeSnackbarStatus.open('댓글이 수정 되었습니다.', 'success');
    } catch (error) {
      noticeSnackbarStatus.open('댓글 수정에 실패했습니다.', 'error');
    }
    repliesStatus.replyModify(id, content);
    status.close();
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출의 기본 동작 막기
    modify(replyId, editedContent);
  };

  // repliesStatus에서 replies에 replyId와 일치하는 reply 가져오도록 만드는 함수

  const findReplyById = (id) => {
    return repliesStatus.replies.find((reply) => reply.id === id);
  };

  // replyId와 일치하는 댓글 찾기
  const reply = findReplyById(replyId);
  // 텍스트 필드의 내용이 변경될 때 호출되는 함수
  const handleContentChange = (event) => {
    if (event.target.value !== reply.content) {
      setEditedContent(event.target.value); // 텍스트 필드에 입력된 값을 상태에 저장
    }
  };
  const [editedContent, setEditedContent] = useState('');

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
          <form action="" onSubmit={handleSubmit}>
            <div>
              <TextField
                style={{ width: '100%' }}
                multiline
                id="outlined-basic"
                label="댓글 수정"
                variant="outlined"
                name="content"
                defaultValue={editedContent || (reply ? reply.content : '')} // 텍스트 필드에 입력된 값이 있으면 그 값을 표시, 아니면 원래 댓글의 내용 표시
                onChange={handleContentChange}
              />
              <Button variant="contained" type="submit">
                수정하기
              </Button>
              <Button variant="contained" onClick={close}>
                수정취소
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

//modal 여기까지

const FreeDetail = ({ noticeSnackbarStatus }) => {
  const repliesStatus = useRepliesStatus();
  const articlesStatus = useArticlesStatus();
  const { id } = useParams();
  const numericId = parseInt(id, 10);
  const article = articlesStatus.findArticleById(numericId);
  const replies = repliesStatus.replies.filter(
    (reply) => reply.relId === numericId && reply.relTypeCode === 'article',
  );
  const relId = numericId;
  const relTypeCode = 'article';
  const history = useHistory();
  //모달창열고닫는거
  const editReplyModalStatus = useEditReplyModalStatus();
  //댓글 입력받는 곳의 값(댓글의 content)
  const [content, setContent] = useState('');
  //입력값 변하면 그대로 반영하도록
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  //댓글 작성 할때
  const replyWrite = async (event) => {
    //페이지 넘어가는거 막는거
    event.preventDefault();

    try {
      //write로 보내기 content 심어서
      await axios.post('/api/reply/write', {
        content,
        relId,
        relTypeCode,
      });
      //댓글입력창 다시 비워주기
      setContent('');

      //성공 메시지
      noticeSnackbarStatus.open('댓글이 작성되었습니다.', 'success');
    } catch (error) {
      // 실패 메시지
      noticeSnackbarStatus.open('댓글 작성에 실패했습니다.', 'error');
    }
    // 작성된 댓글을 상태에 추가
    repliesStatus.replyWrite(content, relId, relTypeCode);
  };

  //댓글 삭제
  const replyDelete = async (id) => {
    try {
      // 서버로 댓글 삭제 요청
      await axios.post('/api/reply/delete', { id });
      // 상태에서 댓글 삭제
      repliesStatus.replyDelete(id);
      // 성공 메시지
      noticeSnackbarStatus.open('댓글이 삭제되었습니다.', 'success');
    } catch (error) {
      // 실패 메시지
      noticeSnackbarStatus.open('댓글 삭제에 실패했습니다.', 'error');
    }
  };

  const [replyId, setReplyId] = useState('');
  //수정하기 버튼 눌렀을때 모달창 열리게 하는거
  const modify = (id) => {
    setReplyId(id);
    editReplyModalStatus.open();
  };

  // 글 삭제 함수
  const handleDelete = async () => {
    try {
      const response = await axios.post('/api/recipy/articleDelete', { numericId });

      noticeSnackbarStatus.open('글이 삭제되었습니다.', 'success');
      history.push('/');
    } catch (error) {
      noticeSnackbarStatus.open('글 삭제에 실패했습니다.', 'error');
    }
    articlesStatus.articleDelete(numericId);
  };

  const back = () => {
    history.goBack();
  };

  return (
    <>
      <ReplyModal
        status={editReplyModalStatus}
        noticeSnackbarStatus={noticeSnackbarStatus}
        repliesStatus={repliesStatus}
        replyId={replyId}
      />
      <div style={{ padding: '10px' }} className="title-box tw-flex tw-justify-between">
        <div>
          <ArrowBackIosNewIcon onClick={back} />
          <h1>회원 바베큐 레시피</h1>
          {article && <h1>{article.title}</h1>}
          {article && <h1>조회수 : {article.hitPoint}</h1>}
          좋아요 수 : 10 댓글수 : 10
          <Link to={`/free/modify/${id}`}>
            <Button variant="contained">수정하기</Button>
          </Link>
          <Button variant="contained" onClick={handleDelete}>
            삭제하기
          </Button>
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
      <div className="content-box"> {article && <>{article.content}</>}</div>
      <div className="reply-box tw-p-[10px]">
        <ul>
          {replies.map((reply) => (
            <li className="tw-flex tw-items-center" key={reply.id}>
              <img style={{ width: '50px', height: '50px', border: '2px solid red' }} src="" />
              <div style={{ marginLeft: '30px' }}>
                <h1>작성자 : {reply.author}</h1>
                <h1>수정일 : {reply.updateDate}</h1>
                <p>{reply.content}</p>
                <div>
                  <Button variant="contained">좋아요</Button>
                  <Button variant="contained">싫어요</Button>
                  <Button variant="contained">답글</Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      modify(reply.id);
                    }}>
                    수정
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      replyDelete(reply.id);
                    }}>
                    삭제
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <form action="" className="tw-flex" onSubmit={replyWrite}>
          <TextField
            style={{ width: '100%' }}
            multiline
            name="content"
            autoComplete="off"
            label="댓글을 입력해주세요"
            value={content}
            onChange={handleContentChange}
          />
          <Button variant="contained" type="submit">
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
export default FreeDetail;
