import pool from '../../app/lib/db';

export default async function handler(req, res) {
  try {
    const { id } = req.body; // Retrieve ID from request body
    const [rows, fields] = await pool.execute('SELECT * FROM `member` WHERE id = ?', [id]);
    if (rows.length === 0) {
      // Handle case where no data is found for the given ID
      res.status(404).json({ error: 'Member not found' });
    } else {
      // Data found, send it in the response
      res.status(200).json(rows[0]); // Assuming you only expect one result
    }
  } catch (error) {
    console.error('Error fetching member detail:', error);
    res.status(500).json({ error: 'Error fetching member detail' });
  }
}
