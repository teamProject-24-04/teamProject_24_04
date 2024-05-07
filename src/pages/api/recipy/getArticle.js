// src/pages/api/recipy/getArticle.js
import pool from '../../../app/lib/db';

export default async function handler(req, res) {
  try {
    // Extract the ID from the request body
    const { id } = req.body;

    // Check if ID is provided
    if (!id) {
      return res.status(400).json({ error: 'ID required' });
    }

    // Select the article from the database based on the ID
    const [article] = await pool.execute('SELECT * FROM article WHERE id = ?', [id]);

    // Check if the article exists
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Return the article
    res.status(200).json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Error fetching article' });
  }
}
