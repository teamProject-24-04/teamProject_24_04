import React from 'react';
import { useParams } from 'react-router-dom';

function DetailPage() {
  // useParams를 통해 URL 파라미터 중 id 값을 가져옴
  let { id } = useParams();

  return (
    <div>
      <h1>Detail Page</h1>
      <p>ID: {id}</p>
    </div>
  );
}

export default DetailPage;
