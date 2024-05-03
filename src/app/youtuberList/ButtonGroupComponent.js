import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { FaUser } from 'react-icons/fa';

function ButtonGroupComponent({ isPressed1, isPressed2, handleButtonClick1, handleButtonClick2 }) {
  return (
    <div style={{ display: 'flex', width: '100%', marginTop: '5%' }}>
      <div style={{ width: '50%', flexGrow: 1 }}>
        <ButtonGroup disableElevation variant="contained" fullWidth>
          <Button
            style={{
              borderRadius: 0,
              backgroundColor: isPressed1 ? '#888' : '#fff',
              color: '#000',
              boxShadow: isPressed1 ? '2px 2px 5px rgba(0, 0, 0, 0.3)' : 'none',
              textAlign: 'left',
            }}
            onClick={handleButtonClick1}>
            <span style={{ fontSize: '110%', fontWeight: 'bold', lineHeight: '1.2', padding: '0' }}>
              인기 유튜버 레시피 <br />
              <span
                style={{ fontSize: '50%', fontWeight: 'bold', lineHeight: '1.2', padding: '0' }}>
                완벽한 바베큐를 위한 유튜버들의 레시피
              </span>
            </span>
          </Button>
        </ButtonGroup>
      </div>
      <div style={{ width: '50%', flexGrow: 1 }}>
        <ButtonGroup disableElevation variant="contained" fullWidth>
          <Button
            style={{
              borderRadius: 0,
              backgroundColor: isPressed2 ? '#888' : '#fff',
              color: '#000',
              boxShadow: isPressed2 ? '2px 2px 5px rgba(0, 0, 0, 0.3)' : 'none',
              textAlign: 'left',
            }}
            onClick={handleButtonClick2}>
            <span style={{ fontSize: '110%', fontWeight: 'bold', lineHeight: '1.2', padding: '0' }}>
              회원 바베큐 레시피 <br />
              <span
                style={{ fontSize: '50%', fontWeight: 'bold', lineHeight: '1.2', padding: '0' }}>
                완벽한 바베큐를 위한 회원들의 레시피
              </span>
            </span>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default ButtonGroupComponent;
