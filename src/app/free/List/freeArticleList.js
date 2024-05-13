import React from 'react';
import useArticlesStatus from '../../recipy/RecipyStatus';
//className 사용하게 해주는거
import classNames from 'classnames';

//mui 컴포넌트
import { Button } from '@mui/material';
//아이콘
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

export default function FreeArticleList() {
  const articlesStatus = useArticlesStatus();
  const articles = articlesStatus.articles.filter((article) => article.boardId === 2);

  const hitPointUp = async (id) => {
    try {
      // 해당 글의 ID를 서버로 전송하여 조회수를 증가시킴
      await axios.post('/api/recipy/increaseHitPoint', { id });
    } catch (error) {
      console.error('Error increasing hit point:', error);
      alert('Error increasing hit point');
    }
  };

  return (
    <>
      <div style={{ textAlign: 'end' }}>
        <Link to={'/search'}>
          <SearchIcon sx={{ width: '50px', height: '50px' }} />
        </Link>
      </div>
      <Link to={'/free/write'}>
        <Button style={{ width: '100%' }} className="tw-flex" variant="contained">
          자유게시판 글쓰기
        </Button>
      </Link>
      <div>
        <ul>
          {articles.map((article) => (
            <li className="tw-flex tw-justify-around tw-items-center" key={article.id}>
              <Link
                to={`/freedetail/${article.id}`}
                onClick={() => {
                  hitPointUp(article.id);
                }}>
                <div className="tw-flex tw-mt-3">
                  <div>
                    <img
                      style={{ width: '80px', height: '80px' }}
                      src="https://picsum.photos/id/237/200/300"
                    />
                    <h1>회원1</h1>
                  </div>
                  <div className="tw-ml-3">
                    <h1>제목:{article.title}</h1>
                    <h1>날짜:{article.updateDate}</h1>
                    <div>
                      <VisibilityIcon /> : {article.hitPoint}
                      <FavoriteIcon /> : 10
                      <ModeCommentIcon />: 10
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
