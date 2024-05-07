// src/pages/api/reply/modify.js
import pool from '../../../app/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '허용되지 않은 메소드' });
  }

  try {
    const { id, content } = req.body;

    if (!id || !content) {
      return res.status(400).json({ error: 'id와 content가 필요합니다' });
    }

    const [result] = await pool.execute('UPDATE reply SET content = ? WHERE id = ?', [content, id]);

    res.status(200).json({ id });
  } catch (error) {
    console.error('댓글 수정 오류:', error);
    res.status(500).json({ error: '댓글 수정 중 오류가 발생했습니다' });
  }
}
