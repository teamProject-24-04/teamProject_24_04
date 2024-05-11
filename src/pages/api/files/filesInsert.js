// 경로: src/pages/api/filesInsert.js

import pool from '../../../app/lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { files } = req.body;

      // 파일 정보를 files 테이블에 삽입
      const query =
        'INSERT INTO files (regDate, updateDate, memberId, relId, relTypeCode, fileName, filePath, filesize, filetype, fileExtTypeCode, fileExtType2Code) VALUES ?';
      const values = files.map((file) => [
        new Date(), // regDate
        new Date(), // updateDate
        file.memberId,
        file.relId,
        file.relTypeCode,
        file.fileName,
        file.filePath,
        file.filesize,
        file.filetype,
        file.fileExtTypeCode,
        file.fileExtType2Code,
      ]);

      await pool.query(query, [values]);

      res.status(200).json({ message: 'Files inserted successfully.' });
    } catch (error) {
      console.error('Error inserting files:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
