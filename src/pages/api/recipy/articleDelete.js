import pool from '../../../app/lib/db';

export default async function handler(req, res) {
  try {
    const { numericId } = req.body;

    if (!numericId) {
      return res.status(400).json({ error: 'numericId required' });
    }

    const [result] = await pool.execute('DELETE FROM article WHERE id = ?', [numericId]);

    res.status(200).json({ numericId });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Error deleting article' });
  }
}
