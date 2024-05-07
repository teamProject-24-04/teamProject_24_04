// src/pages/api/recipy/articleWrite.js
import pool from '../../../app/lib/db';

export default async function handler(req, res) {
  try {
    // Extract title, content, and boardId from the request body
    const { title, content, boardId } = req.body;

    // Check if title, content, and boardId are provided
    if (!title || !content || !boardId) {
      return res.status(400).json({ error: 'Title, content, and boardId are required' });
    }

    // Insert the new article into the database
    const [result] = await pool.execute(
      'INSERT INTO article (regDate, updateDate, title, content, boardId) VALUES (NOW(), NOW(),?, ?, ?)',
      [title, content, boardId],
    );

    // Return the ID of the newly inserted article
    res.status(200).json({ id: result.insertId });
  } catch (error) {
    console.error('Error inserting article:', error);
    res.status(500).json({ error: 'Error inserting article' });
  }
}
