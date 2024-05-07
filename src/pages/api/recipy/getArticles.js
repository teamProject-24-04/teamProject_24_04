// src/pages/api/recipy/getArticles.js

import pool from '../../../app/lib/db';

export default async function handler(req, res) {
  try {
    // 데이터베이스에서 글 목록을 가져옴
    const [rows] = await pool.query('SELECT * FROM article');

    // 글 목록을 클라이언트에 전송
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Error fetching articles' });
  }
}
