'use client';

import React from 'react';
import useArticlesStatus from '@/app/recipy/RecipyStatus';
//className 사용하게 해주는거
import classNames from 'classnames';

//mui 컴포넌트
import { Button } from '@mui/material';
//아이콘
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';

export default function FreeArticleList() {
  const articlesStatus = useArticlesStatus();
  const articles = articlesStatus.articles.filter((article) => article.boardId === 2);

  return (
    <>
      <div>자유게시판 리스트</div>

      <Button style={{ width: '100%' }} className="tw-flex" variant="contained">
        자유게시판 글쓰기
      </Button>

      <div>
        <ul>
          {articles.map((article) => (
            <li className="tw-flex tw-justify-around tw-items-center" key={article.id}>
              <div>
                <img
                  style={{ width: '50px', height: '50px' }}
                  src="https://picsum.photos/id/237/200/300"
                />
                <h1>회원1</h1>
              </div>
              <div>
                <h1>제목:{article.title}</h1>
                <h1>날짜:{article.updateDate}</h1>
                <div>
                  <VisibilityIcon /> : {article.hitPoint}
                  <FavoriteIcon /> : 10
                  <ModeCommentIcon />: 10
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
