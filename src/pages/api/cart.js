// pages/api/cart.js

import pool from '../../app/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Query to fetch cart items from the database
      const [rows, fields] = await pool.execute('SELECT * FROM cart_items');
      res.status(200).json({ cartItems: rows });
    } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).json({ error: 'Error fetching cart items' });
    }
  } else {
    // Handle other HTTP methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
