// 'use client';
// import React, { useState, useRef } from 'react';
// import classNames from 'classnames';
// import RootTheme from '@/app/theme';

// import { Box, Button, Tab, Tabs, TextField } from '@mui/material';

// import PropTypes from 'prop-types';

// // 상단탭
// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}>
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <div>{children}</div>
//         </Box>
//       )}
//     </div>
//   );
// }

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// function FreeBoard() {
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <>
//       <Box sx={{ width: '100%' }}>
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//             <Tab label="레시피" {...a11yProps(0)} />
//             <Tab label="게시판" {...a11yProps(1)} />
//           </Tabs>
//         </Box>
//         <CustomTabPanel value={value} index={0}></CustomTabPanel>
//         <CustomTabPanel value={value} index={1}>
//           <div>
//             <table className="tw-table tw-align-center">
//               <thead>
//                 <tr>
//                   <th>번호</th>
//                   <th>작성자</th>
//                   <th>제목</th>
//                   <th>작성날짜</th>
//                   <th>좋아요</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <th>1</th>
//                   <td>
//                     <div className="tw-flex tw-items-center tw-gap-3">
//                       <div className="tw-avatar">
//                         <div className="tw-mask tw-mask-squircle tw-w-12 tw-h-12">
//                           <img src="https://picsum.photos/200/300" />
//                         </div>
//                       </div>
//                       <div>
//                         <div className="tw-font-bold">홍길동</div>
//                         <div className="tw-text-sm tw-opacity-50">무엇을 넣을지 고민</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td>
//                     안녕하세요
//                     <br />
//                     <span className="tw-badge tw-badge-ghost tw-badge-sm">댓글수</span>
//                   </td>
//                   <td>2024-04-23</td>
//                   <th>10</th>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </CustomTabPanel>
//       </Box>
//     </>
//   );
// }

// export default FreeBoard;
