import fs from 'fs';
import path from 'path';
import pool from '../../../app/lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const formData = req.body; // 클라이언트에서 전송된 FormData를 가져옴

      // 파일 정보를 files 테이블에 삽입
      const query =
        'INSERT INTO files (regDate, updateDate, memberId, relId, relTypeCode, fileName, filesize, filetype) VALUES ?'; // parameterized query 사용
      const values = formData.filesNames.map((fileName, index) => [
        new Date(), // regDate
        new Date(), // updateDate
        formData.memberId,
        formData.relId,
        formData.relTypeCode,
        fileName,
        formData.fileSizes[index], // 파일 크기 추가
        formData.fileTypes[index], // 파일 타입 추가
      ]);

      await pool.query(query, [values]);

      // 파일을 public/articleFiles 디렉토리에 저장
      const uploadDir = path.join(process.cwd(), 'public', 'articleFiles');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      formData.files.forEach((file, index) => {
        const filePath = path.join(uploadDir, formData.filesNames[index]);
        fs.writeFileSync(filePath, file);
      });

      res.status(200).json({ message: 'Files inserted successfully.' });
    } catch (error) {
      console.error('Error inserting files:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
