// 경로 : src/app/files/filesStatus.js
'use client';
//리액트
import React, { useState, useEffect, useRef } from 'react';
//리코일
import { atom, useRecoilState, RecoilRoot } from 'recoil';
//db연결을 위한 axios
import axios from 'axios';
//날짜 유틸
import dateToStr from '../Ut/dateUtil';

//files 관련 스테이터스
const filesAtom = atom({
  key: 'app/filesAtom',
  default: [],
});

function useFilesStatus() {
  const [files, setFiles] = useRecoilState(filesAtom);

  useEffect(() => {
    // API 호출하여 글 목록을 가져옴
    const fetchFiles = async () => {
      try {
        const response = await axios.get('/api/files/getfiles');
        setfiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []); // 마운트될

  return {
    files,
    setFiles,
  };
}
//article 관련 스테이터스 끝

export default useArticlesStatus;
