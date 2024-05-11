import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { MdLocalFireDepartment } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
      <Link to={`/search`}>
        <CiSearch style={{ marginLeft: 'auto', fontSize: '30px', marginTop: '20px' }} />
      </Link>
      <div style={{ marginTop: '5%', display: 'flex', alignItems: 'center' }}>
        <MdLocalFireDepartment
          style={{ marginRight: '5px', verticalAlign: 'bottom', fontSize: '24px', color: 'red' }}
        />
        <p>인기 유튜버 레시피</p>
      </div>
    </div>
  );
}

export default Header;
