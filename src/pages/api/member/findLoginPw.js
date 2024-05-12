import pool from '../../../app/lib/db';

export default async function handler(req, res) {
  try {
    // 요청에서 로그인 아이디와 비밀번호 값을 가져옴
    const { loginId, email } = req.body;

    // member 테이블에서 해당 로그인 아이디와 비밀번호로 회원 정보 조회
    const [result] = await pool.execute(
      'SELECT loginPw FROM member WHERE loginId = ? AND email = ?',
      [loginId, email],
    );

    // 조회된 회원 정보가 없으면 로그인 실패 메시지 반환
    if (result.length === 0) {
      return res.status(401).json({ error: 'Invalid email or name' });
    }

    // 로그인 성공 시 200 상태 코드와 로그인된 회원 정보 반환
    res.status(200).json({ message: '비밀번호찾기에 성공했습니다', member: result[0] });
  } catch (error) {
    console.error('Error checking find:', error);
    res.status(500).json({ error: 'Error checking find' });
  }
}
