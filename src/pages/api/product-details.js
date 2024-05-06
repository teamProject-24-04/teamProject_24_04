// pages/api/product-details.js
import pool from '../../app/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const [rows, fields] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length > 0) {
      // 제품을 찾았으면 상세 정보 반환
      res.status(200).json(rows[0]);
    } else {
      // 해당 ID의 제품이 없으면 404 상태 코드 반환
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Error fetching product details' });
  }
}
