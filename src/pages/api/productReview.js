import express from 'express';
import pool from '../../app/lib/db';

const router = express.Router();

router.post('/', (req, res) => {
  const { productId, memberId, review } = req.body;

  const sql = 'INSERT INTO reviews (product_id, member_id, review) VALUES (?, ?, ?)';
  const values = [productId, memberId, review];

  pool.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error inserting review into database:', error);
      res.status(500).json({ error: 'Error inserting review into database' });
      return;
    }

    console.log('Review inserted into database:', results);

    res.status(200).json({ message: 'Review submitted successfully' });
  });
});

export default router;
