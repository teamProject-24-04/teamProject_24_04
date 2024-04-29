// src/pages/api/articleWrite.js
import pool from '../../app/lib/db';

export default async function handler(req, res) {
  try {
    // 요청에서 제목과 내용 값을 가져옴
    const { title, content } = req.body;

    // 제목과 내용이 없는 경우 에러 반환
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // article 테이블에 데이터 추가
    const [result] = await pool.execute('INSERT INTO article (title, content) VALUES (?, ?)', [
      title,
      content,
    ]);

    // 삽입된 행의 ID를 반환
    res.status(200).json({ id: result.insertId });
  } catch (error) {
    console.error('Error inserting article:', error);
    res.status(500).json({ error: 'Error inserting article' });
  }
}
