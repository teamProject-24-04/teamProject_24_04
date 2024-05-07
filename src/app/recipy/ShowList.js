import React from 'react';
import { Link } from 'react-router-dom';
import useArticlesStatus from '../recipy/recipyStatus';

const ShowList = () => {
  const articlesStatus = useArticlesStatus();
  return (
    <>
      <div>안녕</div>
      <div>
        <h2>글 목록</h2>
        <ul>
          {articlesStatus.articles.map((article) => (
            <li key={article.id}>
              <Link to={`/detail/${article.id}`}>
                {/* Link 추가 */}
                <h1>{article.id}</h1>
                <h1>{article.title}</h1>
                <h1>{article.content}</h1>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ShowList;
