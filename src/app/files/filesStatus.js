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

const filesAtom = atom({
  key: 'app/filesAtom',
  default: [],
});

function useFilesStatus() {
  const [files, setFiles] = useRecoilState(filesAtom);

  // 파일 업로드
  const filesInsert = async (formData) => {
    try {
      const response = await axios.post('/api/files/filesInsert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // 성공 시 파일 목록 갱신
      setFiles([...files, response.data]);
    } catch (error) {
      console.error('Error inserting files:', error);
    }
  };

  // 파일 삭제
  const filesDelete = async (fileId) => {
    try {
      await axios.delete(`/api/files/deleteFile/${fileId}`);
      // 성공 시 해당 파일 제외한 목록 갱신
      setFiles(files.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  // 파일 수정
  const filesUpdate = async (fileId, updatedFileData) => {
    try {
      const response = await axios.put(`/api/files/updateFile/${fileId}`, updatedFileData);
      // 성공 시 해당 파일 업데이트
      setFiles(files.map((file) => (file.id === fileId ? response.data : file)));
    } catch (error) {
      console.error('Error updating file:', error);
    }
  };

  return {
    files,
    filesInsert,
    filesDelete,
    filesUpdate,
  };
}

// export { filesAtom, useFilesStatus };
export default useFilesStatus;
