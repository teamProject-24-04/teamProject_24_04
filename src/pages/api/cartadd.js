import pool from '../../app/lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { productId, quantity, product_name, price, imageURL } = req.body;

    try {
      // Check if the product already exists in the cart
      const [existingProduct] = await pool.execute(
        'SELECT * FROM cart_items WHERE product_id = ?',
        [productId],
      );

      if (existingProduct.length > 0) {
        // If the product already exists, update its quantity and price
        const updatedQuantity = existingProduct[0].quantity + quantity;
        const updatedPrice = existingProduct[0].price + price * quantity;

        await pool.execute('UPDATE cart_items SET quantity = ?, price = ? WHERE product_id = ?', [
          updatedQuantity,
          updatedPrice,
          productId,
        ]);
      } else {
        // If the product does not exist, insert it into the cart
        await pool.execute(
          'INSERT INTO cart_items (product_id, product_name, price, quantity, imageURL) VALUES (?, ?, ?, ?, ?)',
          [productId, product_name, price, quantity, imageURL],
        );
      }

      res.status(201).json({ message: 'Item added to cart successfully' });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'Error adding item to cart' });
    }
  } else {
    // Handle other HTTP methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
