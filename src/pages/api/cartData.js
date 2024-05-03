import pool from '../../app/lib/db';

export default async function handler(req, res) {
  try {
    // 데이터베이스에서 카트 데이터를 가져옴
    const [rows, fields] = await pool.execute('SELECT * FROM cart');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching cart data:', error);
    res.status(500).json({ error: 'Error fetching cart data' });
  }
}
