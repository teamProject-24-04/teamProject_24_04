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
import MyPage from './member/mypage/MyPage';

function BottomNavigationComponent({ value, onChange }) {
  const [bottomValue, setBottomValue] = React.useState(2);

  return (
    <>
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 1 }}>
        <BottomNavigation
          showLabels
          value={bottomValue}
          onChange={(event, newValue) => {
            setBottomValue(newValue);
          }}>
          <BottomNavigationAction
            label="쇼핑"
            icon={<ShoppingBagIcon />}
            onClick={() => setBottomValue(0)}
          />
          <BottomNavigationAction
            label="자유게시판"
            icon={<ForumIcon />}
            onClick={() => setBottomValue(1)}
          />
          <BottomNavigationAction
            label="레시피"
            icon={<ReceiptIcon />}
            onClick={() => setBottomValue(2)}
          />
          <BottomNavigationAction
            label="길찾기"
            icon={<NavigationIcon />}
            onClick={() => setBottomValue(3)}
          />
          <BottomNavigationAction
            label="마이페이지"
            icon={<PersonIcon />}
            onClick={() => setBottomValue(4)}
          />
        </BottomNavigation>
      </Box>

      <Box sx={{ paddingBottom: 10, width: '97%' }}>
        {bottomValue === 1 && <Write />}
        {bottomValue === 2 && <YoutuberList />}
        {bottomValue === 4 && <MyPage />}
      </Box>
    </>
  );
}

export default BottomNavigationComponent;