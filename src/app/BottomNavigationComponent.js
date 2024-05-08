import React from 'react';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  Person as PersonIcon,
  ShoppingBag as ShoppingBagIcon,
  Navigation as NavigationIcon,
  Forum as ForumIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';
import Write from './recipy/Write';
import YoutuberList from './youtuberList/YoutuberList';

function BottomNavigationComponent({ value, onChange }) {
  const [bottomValue, setBottomValue] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(null);

  return (
    <>
      <Box sx={{ height: '50px' }} />
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
        <BottomNavigation
          showLabels
          value={bottomValue}
          onChange={(event, newValue) => {
            setBottomValue(newValue);
            setCurrentPage(newValue);
          }}>
          <BottomNavigationAction
            label="쇼핑"
            icon={<ShoppingBagIcon />}
            onClick={() => setCurrentPage(0)}
          />
          <BottomNavigationAction
            label="자유게시판"
            icon={<ForumIcon />}
            onClick={() => setCurrentPage(1)}
          />
          <BottomNavigationAction
            label="레시피"
            icon={<ReceiptIcon />}
            onClick={() => setCurrentPage(2)}
          />
          <BottomNavigationAction
            label="길찾기"
            icon={<NavigationIcon />}
            onClick={() => setCurrentPage(3)}
          />
          <BottomNavigationAction
            label="마이페이지"
            icon={<PersonIcon />}
            onClick={() => setCurrentPage(4)}
          />
        </BottomNavigation>
      </Box>
      {currentPage === 1 && <Write />}
      {currentPage === 2 && <YoutuberList />}
    </>
  );
}

export default BottomNavigationComponent;
