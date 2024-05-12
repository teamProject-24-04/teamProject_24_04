// 경로 : src/app/recipy/recipyStatus/recipyStatus.js
'use client';
//리액트
import React, { useState, useEffect, useRef } from 'react';
//리코일
import { atom, useRecoilState, RecoilRoot } from 'recoil';
//db연결을 위한 axios
import axios from 'axios';
//날짜 유틸
import dateToStr from '../Ut/dateUtil';

//article 관련 스테이터스
const articlesAtom = atom({
  key: 'app/articlesAtom',
  default: [],
});

function useArticlesStatus() {
  const [articles, setArticles] = useRecoilState(articlesAtom);

  useEffect(() => {
    // API 호출하여 글 목록을 가져옴
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/recipy/getArticles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []); // 마운트될

  // 작성
  const articleWrite = (boardId, title, content, memberId) => {
    const id = articles.length + 1;
    const newArticle = {
      id,
      memberId,
      boardId,
      title,
      content,
      regDate: dateToStr(new Date()),
      updateDate: dateToStr(new Date()),
    };
    setArticles((prevArticles) => [newArticle, ...prevArticles]);
  };

  // 삭제
  const articleDelete = (id) => {
    setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id));
  };

  //아티클의 인덱스를 아이디로 찾기
  const findArticleIndexById = (id) => {
    return articles.findIndex((article) => article.id === id);
  };
  //찾아온 인덱스로 아티클 찾기
  const findArticleById = (id) => {
    const index = findArticleIndexById(id);

    if (index === -1) {
      return null;
    }

    return articles[index];
  };

  //수정
  const articleModify = (id, boardId, title, content) => {
    const index = findArticleIndexById(id);

    if (index !== -1) {
      const modifiedArticle = {
        ...articles[index],
        boardId,
        title,
        content,
        updateDate: dateToStr(new Date()),
      };

      const updatedArticles = [...articles];
      updatedArticles[index] = modifiedArticle;
      setArticles(updatedArticles);
    }
  };
  //조회수 증가
  const increaseHitPoint = async (id) => {
    try {
      // 서버에 조회수 증가 요청 보내기
      await axios.post('/api/recipy/increaseHitPoint', { id });
      // 클라이언트 측에서도 조회수 증가
      const updatedArticles = articles.map((article) => {
        if (article.id === id) {
          return { ...article, hitPoint: article.hitPoint + 1 };
        }
        return article;
      });
      setArticles(updatedArticles);
    } catch (error) {
      console.error('Error increasing hit point:', error);
    }
  };

  return {
    articles,
    articleWrite,
    findArticleIndexById,
    findArticleById,
    articleModify,
    articleDelete,
    increaseHitPoint,
  };
}
//article 관련 스테이터스 끝

export default useArticlesStatus;
