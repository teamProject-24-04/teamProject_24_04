// src/pages/api/reply/delete.js
import pool from '../../../app/lib/db';

export default async function handler(req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'id 필요해' });
    }

    const [result] = await pool.execute('DELETE FROM reply WHERE id = ?', [id]);

    res.status(200).json({ id: result.insertId });
  } catch (error) {
    console.error('Error inserting reply:', error);
    res.status(500).json({ error: 'Error delete reply' });
  }
}
