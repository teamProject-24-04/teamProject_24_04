// src/pages/api/articleModify.js
import pool from '../../../app/lib/db';

export default async function handler(req, res) {
  try {
    const { id, title, content, boardId } = req.body;

    if (!id || !title || !content || !boardId) {
      return res.status(400).json({ error: 'id, Title, content, and boardId are required' });
    }

    const [result] = await pool.execute(
      'UPDATE article SET updateDate = NOW(), boardId = ?, title = ?, content = ? WHERE id = ?',
      [boardId, title, content, id],
    );

    res.status(200).json({ id: result.insertId });
  } catch (error) {
    console.error('Error update article:', error);
    res.status(500).json({ error: 'Error update article' });
  }
}
