// ShowList 컴포넌트
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useArticlesStatus from '../RecipyStatus';

const ShowList = () => {
  const articlesStatus = useArticlesStatus();
  const articles = articlesStatus.articles;

  const test = async (id) => {
    try {
      // 해당 글의 ID를 서버로 전송하여 조회수를 증가시킴
      await axios.post('/api/recipy/increaseHitPoint', { id });
    } catch (error) {
      console.error('Error increasing hit point:', error);
      alert('Error increasing hit point');
    }
  };
  return (
    <div>
      <h2>글 목록</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            {/* Link 컴포넌트를 사용하여 게시물 ID를 포함한 URL로 이동 */}
            <Link
              to={`/recipy/detail/${article.id}`}
              onClick={() => {
                test(article.id);
              }}>
              <h1>{article.title}</h1>
              <p>{article.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;
