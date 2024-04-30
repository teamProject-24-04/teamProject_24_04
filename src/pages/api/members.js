// src/pages/api/articles.js
import pool from '../../app/lib/db';

export default async function handler(req, res) {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM member');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching member:', error);
    res.status(500).json({ error: 'Error fetching articles' });
  }
}
