import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import classNames from 'classnames';
import useArticlesStatus from '../../recipy/RecipyStatus';
const FreeWrite = ({ noticeSnackbarStatus }) => {
  const [boardId, setBoardId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const articlesStatus = useArticlesStatus();

  const boardChange = (event) => {
    setBoardId(event.target.value);
  };

  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const contentChange = (event) => {
    setContent(event.target.value);
  };

  const write = async (event) => {
    event.preventDefault();
    articlesStatus.articleWrite(boardId, title, content);

    try {
      // 글 작성
      const response = await axios.post('/api/recipy/articleWrite', {
        boardId: boardId,
        title: title,
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
      <div style={{ border: '2px solid red' }}>
        <form action="" onSubmit={write}>
          <div
            style={{ border: '2px solid red' }}
            className="tw-flex tw-items-center tw-justify-around">
            <div>분류 :</div>
            <Box sx={{ minWidth: '70%' }}>
              <FormControl fullWidth>
                <InputLabel id="boardId-label">게시판을 골라주세요</InputLabel>
                <Select
                  labelId="boardId-label"
                  id="boardId-select"
                  value={boardId}
                  onChange={boardChange}>
                  <MenuItem value={1}>회원레시피</MenuItem>
                  <MenuItem value={2}>유튜버레시피</MenuItem>
                  <MenuItem value={3}>자유게시판</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div
            className="tw-flex tw-items-center tw-justify-around"
            style={{ border: '2px solid red' }}>
            <div>제목 :</div>{' '}
            <TextField name="title" sx={{ width: '70%' }} value={title} onChange={titleChange} />
          </div>

          <TextField
            style={{ width: '100%' }}
            minRows={20}
            maxRows={20}
            multiline
            name="content"
            autoComplete="off"
            label="내용을 입력해주세요"
            value={content}
            onChange={contentChange}
          />

          <div className="tw-flex tw-justify-around">
            <Button variant="contained">작성 취소</Button>
            <Button type="submit" variant="contained">
              작성 하기
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FreeWrite;
