// src/app/page.js
'use client';

import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

export default function themeApp() {
  return (
    <>
      <div>
        <form className="tw-flex tw-flex-col tw-p-4 tw-gap-2">
          <div className="tw-flex tw-items-center">
            <div>제목 : </div>
            <TextField
              className="tw-flex-1"
              name="title"
              autoComplete="off"
              label="제목을 입력해주세요"
            />
          </div>

          <TextField
            minRows={3}
            maxRows={10}
            multiline
            name="content"
            autoComplete="off"
            label="내용을 입력해주세요"
          />
          <div className="tw-flex tw-justify-around">
            <Button variant="contained" className="tw-font-bold" type="reset">
              작성취소
            </Button>
            <Button variant="contained" className="tw-font-bold" type="submit">
              작성하기
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
