// src/app/page.js
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Page() {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get('/api/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }

    fetchArticles();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/articleWrite', { title, content });
      // 기사 작성 후 기사 목록을 다시 가져오기
      const response = await axios.get('/api/articles');
      setArticles(response.data);
      // 작성 후 입력 필드 초기화
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error writing article:', error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            className="tw-input tw-input-bordered"
            type="text"
            placeholder="제목 작성"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="tw-input tw-input-bordered"
            type="text"
            placeholder="내용 작성"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input className="tw-btn tw-btn-sm tw-btn-outline" type="submit" value="작성" />
        </form>
      </div>
      <div>
        <h1>Articles</h1>
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <h2>{article.title}</h2>
              <p>{article.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
