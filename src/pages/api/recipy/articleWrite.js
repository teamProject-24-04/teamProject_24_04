// src/pages/api/articleWrite.js
import pool from '../../../app/lib/db';

export default async function handler(req, res) {
  try {
    const { title, content, boardId, memberId } = req.body;

    if (!title || !content || !boardId || !memberId) {
      return res.status(400).json({ error: 'Title, content, and boardId are required' });
    }

    const [result] = await pool.execute(
      'INSERT INTO article (regDate, updateDate, title, content, boardId,memberId) VALUES (NOW(), NOW(),?, ?, ?,?)',
      [title, content, boardId, memberId],
    );

    res.status(200).json({ id: result.insertId });
  } catch (error) {
    console.error('Error inserting article:', error);
    res.status(500).json({ error: 'Error inserting article' });
  }
}
