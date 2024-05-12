'use client';
import React, { useState, useRef } from 'react';
import classNames from 'classnames';

import { Box, Button, Tab, Tabs, TextField } from '@mui/material';
import useArticlesStatus from '../recipy/RecipyStatus';
import useRepliesStatus from '../reply/replyStatus';

import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';

// 상단탭
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function SearchPage() {
  const [value, setValue] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const changeTab = (event, newValue) => {
    setValue(newValue);
  };

  const articlesStatus = useArticlesStatus();

  const recipies = articlesStatus.articles.filter((article) => article.boardId === 1);
  const articles = articlesStatus.articles.filter((article) => article.boardId === 2);

  const filteredRecipies = recipies.filter((recipy) =>
    recipy.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="tw-flex tw-items-center">
          <div>
            <select>
              <option value="title">제목</option>
              <option value="content">내용</option>
              <option value="author">작성자</option>
            </select>
          </div>
          <div className="tw-flex-1">
            <TextField
              sx={{ width: '100%' }}
              value={searchTerm}
              onChange={handleChange}
              placeholder="검색어를 입력하세요"
            />
          </div>
          <div style={{ width: '50px', backgroundColor: 'red' }}>
            <button type="submit">
              <SearchIcon sx={{ width: '100%', height: '100%' }} />
            </button>
          </div>
        </div>
      </form>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={changeTab} aria-label="basic tabs example">
            <Tab label="레시피" />
            <Tab label="게시판" />
          </Tabs>
        </Box>
        <div role="tabpanel" hidden={value !== 0}>
          {filteredRecipies.map((recipy) => (
            <div key={recipy.id}>
              <h1>{recipy.title}</h1>
              <p>{recipy.content}</p>
            </div>
          ))}
        </div>
        <div role="tabpanel" hidden={value !== 1}>
          {filteredArticles.map((article) => (
            <div key={article.id}>
              <h1>{article.title}</h1>
              <p>{article.content}</p>
            </div>
          ))}
        </div>
      </Box>
    </>
  );
}

export default SearchPage;
