'use client';
import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import RootTheme from './theme';
import dateToStr from './dateUtil';

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

import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function App() {
  const [value, setValue] = useState(0);
  const [files, setFiles] = useState([]);
  const inputFileRef = useRef(null);

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 제출 관련 작업을 수행합니다.
    console.log('Form submitted');
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar />
      </AppBar>
      <Toolbar />

      <div>
        <form onSubmit={handleSubmit} className="tw-flex tw-flex-col tw-p-4 tw-gap-2">
          <div className="tw-flex tw-items-center">
            <div>카테고리 : </div>
            <Box sx={{ minWidth: '70%' }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">카테고리를 골라주세요</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}>
                  <MenuItem value={10}>회원레시피</MenuItem>
                  <MenuItem value={20}>유튜버레시피</MenuItem>
                  <MenuItem value={30}>자유게시판</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="tw-flex tw-items-center">
            <div>제목 : </div>
            <TextField
              className="tw-flex-1"
              name="title"
              autoComplete="off"
              label="제목을 입력해주세요"
            />
          </div>
          <Button
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
            multiple // 여러 파일 선택 가능
          />
          <List>
            {files.map((file, index) => (
              <ListItem key={index}>
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>

          <TextField
            minRows={3}
            maxRows={10}
            multiline
            name="content"
            autoComplete="off"
            label="내용을 입력해주세요"
          />
          <div className="tw-flex tw-justify-around">
            <Button variant="contained" className="tw-font-bold" type="submit">
              작성취소
            </Button>
            <Button variant="contained" className="tw-font-bold" type="submit">
              작성하기
            </Button>
          </div>
        </form>
      </div>

      <BottomNavigation />
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}>
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Box>
    </>
  );
}

export default function themeApp() {
  const theme = RootTheme();

  return <App />;
}
