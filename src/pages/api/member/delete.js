import pool from '../../../app/lib/db';

export default async function handler(req, res) {
  try {
    // 요청에서 필요한 데이터 추출
    const { loginId } = req.body;

    // member 테이블에서 삭제
    await pool.execute('DELETE FROM member WHERE loginId = ?', [loginId]);

    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ error: 'Error deleting member' });
  }
}
