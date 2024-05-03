import pool from '../../../app/lib/db';

export default async function handler(req, res) {
  try {
    // 요청에서 로그인 아이디, 비밀번호, 우편번호, 도로명주소, 지번주소, 위도, 경도 값을 가져옴
    const { loginId, loginPw, zonecode, roadAddress, jibunAddress, latitude, longitude } = req.body;

    // 로그인 아이디와 비밀번호가 없는 경우 에러 반환
    if (!loginId || !loginPw) {
      return res.status(400).json({ error: 'loginId and loginPw are required' });
    }

    // member 테이블에 데이터 추가
    const [result] = await pool.execute(
      'INSERT INTO member (loginId, loginPw, address, roadAddress, jibunAddress, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [loginId, loginPw, zonecode, roadAddress, jibunAddress, latitude, longitude],
    );

    // 삽입된 행의 ID를 반환
    res.status(200).json({ id: result.insertId });
  } catch (error) {
    console.error('Error inserting members:', error);
    res.status(500).json({ error: 'Error inserting members' });
  }
}
