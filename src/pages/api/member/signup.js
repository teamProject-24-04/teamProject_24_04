import pool from '../../../app/lib/db';

export default async function handler(req, res) {
  try {
    // 요청에서 필요한 데이터 추출
    const {
      loginId,
      loginPw,
      name,
      nickname,
      phoneNumber,
      zonecode,
      roadAddress,
      jibunAddress,
      latitude,
      longitude,
      detailAddress,
    } = req.body;

    // 로그인 아이디와 비밀번호가 없는 경우 에러 반환
    if (!loginId || !loginPw) {
      return res.status(400).json({ error: 'loginId and loginPw are required' });
    }

    // 필요한 데이터가 없는 경우 에러 반환
    if (!name || !nickname || !phoneNumber) {
      return res.status(400).json({ error: 'name, nickname, and phoneNumber are required' });
    }

    // member 테이블에 데이터 추가
    const [result] = await pool.execute(
      'INSERT INTO member (loginId, loginPw, name, nickname, phoneNumber, address, roadAddress, jibunAddress, latitude, longitude, detailAddress) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        loginId,
        loginPw,
        name,
        nickname,
        phoneNumber,
        zonecode,
        roadAddress,
        jibunAddress,
        latitude,
        longitude,
        detailAddress,
      ],
    );

    // 삽입된 행의 ID를 반환
    res.status(200).json({ id: result.insertId });
  } catch (error) {
    console.error('Error inserting members:', error);
    res.status(500).json({ error: 'Error inserting members' });
  }
}
