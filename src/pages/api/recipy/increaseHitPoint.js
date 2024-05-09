// 경로 src/pages/api/recipy/increaseHitPoint.js
import pool from '../../../app/lib/db';

export default async function handler(req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'id required' });
    }

    // 조회수를 1 증가시키기
    await pool.execute('UPDATE article SET hitPoint = hitPoint + 1 WHERE id = ?', [id]);

    res.status(200).json({ id });
  } catch (error) {
    console.error('Error increasing hit point:', error);
    res.status(500).json({ error: 'Error increasing hit point' });
  }
}
