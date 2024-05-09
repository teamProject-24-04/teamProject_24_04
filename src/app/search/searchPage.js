'use client';
import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import RootTheme from '@/app/theme';

import { Box, Button, Tab, Tabs, TextField } from '@mui/material';

import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';

// 상단탭
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function SearchPage() {
  const [value, setValue] = useState(0);

  const changeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <form action="">
        <div className="tw-flex tw-items-center">
          <div className="tw-flex-1">
            <TextField sx={{ width: '100%' }} />
          </div>
          <div style={{ width: '50px', backgroundColor: 'red' }}>
            <button>
              <SearchIcon sx={{ width: '100%', height: '100%' }} />
            </button>
          </div>
        </div>
      </form>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={changeTab} aria-label="basic tabs example">
            <Tab label="레시피" {...a11yProps(0)} />
            <Tab label="게시판" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}></CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Button style={{ width: '100%' }} variant="contained">
            자유게시판 글쓰기
          </Button>
          통합검색 페이지
        </CustomTabPanel>
      </Box>
    </>
  );
}

export default SearchPage;
