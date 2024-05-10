import pool from '../../app/lib/db';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const productId = req.query.productId; // URL 쿼리 매개변수에서 productId 가져오기

    try {
      // cart_items 테이블에서 해당 상품을 삭제하는 쿼리 실행
      await pool.execute('DELETE FROM cart_items WHERE product_id = ?', [productId]);

      res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      res.status(500).json({ error: 'Error removing item from cart' });
    }
  } else {
    // DELETE 요청이 아닌 경우에는 405 Method Not Allowed 반환
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
