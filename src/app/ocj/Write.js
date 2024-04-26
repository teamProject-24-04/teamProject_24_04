'use client';
import React, { useState, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Write() {
  const [boardId, setBoardId] = React.useState('');
  const handleChange = (event) => {
    setBoardId(event.target.value);
  };

  const [files, setFiles] = useState([]);
  const inputFileRef = useRef(null);
  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
  };

  const handleFileDelete = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <>
      <div style={{ border: '2px solid red' }}>
        <form action="">
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
                  onChange={handleChange}>
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
            <div>제목 :</div> <TextField sx={{ width: '70%' }} />
          </div>

          <Button
            sx={{ width: '100%' }}
            variant="contained"
            className="tw-font-bold"
            onClick={() => inputFileRef.current.click()} // 파일 선택 창 열기
          >
            파일 첨부하기
          </Button>
          <input
            type="file"
            ref={inputFileRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            accept="image/*, video/*" // 이미지 파일과 동영상 파일만 허용
            multiple // 여러 파일 선택 가능
          />
          <List>
            {files.map((file, index) => (
              <ListItem key={index}>
                {/* 파일이 이미지인 경우에만 이미지를 표시 */}
                {file.type.startsWith('image/') && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Photo ${index + 1}`}
                    style={{ marginRight: '10px', height: '50px' }}
                  />
                )}
                {/* 파일 이름 또는 미리보기를 표시 */}
                <ListItemText primary={file.name} />
                <Button onClick={() => handleFileDelete(index)} color="error" size="small">
                  <CloseIcon />
                </Button>
              </ListItem>
            ))}
          </List>

          <TextField
            style={{ width: '100%' }}
            minRows={17}
            maxRows={17}
            multiline
            name="content"
            autoComplete="off"
            label="내용을 입력해주세요"
          />

          <div className="tw-flex tw-justify-around">
            <Button variant="contained">작성 취소</Button>
            <Button variant="contained">작성 하기</Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Write;
