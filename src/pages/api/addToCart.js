import pool from '../../app/lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { productId, quantity } = req.body;
    try {
      // 장바구니에 상품을 추가하는 SQL 쿼리
      const query = `
        INSERT INTO cart_items (cart_id, product_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      const values = [1, productId, quantity]; // 사용자 ID는 임시로 1로 설정

      // 데이터베이스에 쿼리 실행
      const { rows } = await pool.query(query, values);

      // 추가된 상품 정보를 클라이언트에 응답
      res.status(201).json(rows[0]);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      res.status(500).json({ error: 'Error adding product to cart' });
    }
  } else {
    res.status(405).end(); // POST 요청만 허용
  }
}
