// 경로 : src/app/reply/replyStatus.js
'use client';
//리액트
import React, { useState, useEffect, useRef } from 'react';
//리코일
import { atom, useRecoilState, RecoilRoot } from 'recoil';
//db연결을 위한 axios
import axios from 'axios';
//dateUtil
import dateToStr from '../Ut/dateUtil';

//reply 관련 스테이터스
const repliesAtom = atom({
  key: 'app/repliesAtom',
  default: [],
});

function useRepliesStatus() {
  const [replies, setReplies] = useRecoilState(repliesAtom);

  useEffect(() => {
    // API 호출하여 댓글 목록을 가져옴
    const fetchReplies = async () => {
      try {
        const response = await axios.get('/api/reply/getReplies');
        setReplies(response.data);
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    };

    fetchReplies();
  }, []); // 마운트될

  // 작성
  const replyWrite = (content) => {
    const id = replies.length + 1; // Get the new id based on the current length of the articles array
    const newReply = {
      id,
      regDate: dateToStr(new Date()),
      updateDate: dateToStr(new Date()), // Assuming dateToStr is defined elsewhere
      content,
    };
    setReplies((prevReplies) => [newReply, ...prevReplies]);
  };
  // 수정
  const replyModify = (id, newContent) => {
    setReplies((prevReplies) =>
      prevReplies.map((reply) =>
        reply.id === id
          ? { ...reply, content: newContent, updateDate: dateToStr(new Date()) }
          : reply,
      ),
    );
  };

  // 삭제
  const replyDelete = (id) => {
    setReplies((prevReplies) => prevReplies.filter((reply) => reply.id !== id));
  };

  return {
    replies,
    setReplies,
    replyWrite,
    replyDelete,
    replyModify,
  };
}
//reply 관련 스테이터스 끝
export default useRepliesStatus;
