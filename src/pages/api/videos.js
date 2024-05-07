import pool from '../../app/lib/db';

export default async function handler(req, res) {
  try {
    const { id } = req.body; // Retrieve ID from request body
    const [rows, fields] = await pool.execute(
      'SELECT * FROM videos AS v INNER JOIN channels AS c ON v.channel_id = c.id WHERE v.channel_id = ?',
      [id],
    );
    if (rows.length === 0) {
      // Handle case where no data is found for the given ID
      res.status(404).json({ error: 'videos not found' }); // Changed error message to reflect that multiple videos are expected
    } else {
      // Data found, send it in the response
      res.status(200).json(rows); // Returning rows array instead of rows[0]
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Error fetching videos' });
  }
}
