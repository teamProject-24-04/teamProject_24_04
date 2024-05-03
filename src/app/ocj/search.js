'use client';
import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import RootTheme from './theme';

import { Box, Button, Tab, Tabs } from '@mui/material';

import PropTypes from 'prop-types';

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
        <Box sx={{ p: 3 }}>
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="레시피" {...a11yProps(0)} />
            <Tab label="게시판" {...a11yProps(1)} />
            <Tab label="상품" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Button variant="contained">유튜버 레시피</Button>
          <Button variant="contained">회원 레시피</Button>
          <ul>
            <li>
              <div className="tw-flex" style={{ border: '2px solid blue' }}>
                <div style={{ border: '2px solid red' }}>
                  <img
                    style={{ width: '70px', height: '70px' }}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAAA5OTlISEjk5OSampr8/PzCwsKNjY3q6uqlpaXy8vLFxcVwcHBoaGjLy8sYGBgeHh7e3t5PT08/Pz8QEBAoKCjW1tZUVFTu7u6CgoK2trawsLB8fHy7u7uUlJQsLCwyMjKhoaFaWlojIyOHh4dlZWVERERowodxAAAEu0lEQVR4nO2ca3eiMBCGRQUvVPFCRa1Yaa3+/3+4LpNgvdSSMEim533O2S824cyQZG4ZttUCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGiKbs8fzY9xOz7OR36v27Q43LysX70r0pemheKj279Rj+j/jZUcjO6rlzMaNC1edfoP9MvXsWkBK5JML/WZLrLF1U+TpGkhqzD8psl8vU0GwenHYJD0vubf/jJsWkx7zicw3lwfuMGwcz6NjUjHwFJr8Hl/IyafesDyyZIxoRWMox+HJLFkFcdK+PeHo97VqPGTpGJEi/7zAhJRqRfhID3lCla/jlxNaGjvCVIxEir397uCJxWVgwxrl4qTAwldLu7sCjyKLyRz2ezBcLgLtHOJy4ecZJbaNUrEzFsu8M5gxi6f8VaTPPxkpfzEdyJZi0jifhrNWRq/lCYZW0gbSTKn5Atjw1mxIJ9I4YxvOMsXFNhQVjgznDUTlClmpq6C2Imxpl3LxRgZxHnNQlZxYzxvk8+TUJYaWno2ejMSqlJrS7NPTmZdg0Tc0HmymJjPS9nl4WdcSUMJ7iJPficWEydS4rZDpTWUoGG1cyhhl6Z/3tL0rcJSHZhKuGyjEsbWeN5WTCFjZum5vyzX/vmEU7vcIk9JpiJS4HmF/HBei0TcfOSymt60UI7/UYtE3NBqLAKjSUEm5hi2dMXbzCqSJRWR4rd0LrswmpNZ5s3NEHjGyaxq2jDb2Q1CtsYrc3lIDDxBduY/4d7Q9JOD2YtZQh25lQ4yKZwREbEVqE6ZcpZDHUKzq5ymUff4pZZlo8aKCNjOqIvrEgZVmSVRd9w5WvDfkozUk2ZHC3RjaftRoX628MyMklPo1fH8n05YWLTXSihe3LDZafG9/fCepwv9STFiJyVeOzOLve+8rq+vXKL0YoAXC0krNL53SzpMwjAMTv+ij3vd7aa3xk2yOvc4H6/UmF63eXvnVuG5mMb9qPi8ohO1ooX3iMVpxFlHId0mOkbxJlRSfNv/qN+eDEyvMDkiDE5xBNeFAX053NXvUIQxwVr/JuAwahc3vdhxq22aXWiXpduL9DHSx9N516+bnzs3Xj4Ik43//pV+vfubJLxxkKE+jY63Q+stahOjaAfp9EbdVhJSvx7zO4+nMVMi2jZU6I+I3A1vlNG3T4SUihNXCzbj6qZCGSpH77pV+anaPbUKWJ0sSoUUq7Wr7bCArgReXSzaqD1aNXoecOyEWki4tpcKa91r4aM0iaPmSbXWI8OTWFFfcnG0h6qPhFyrLnYYw2YK3jssz2KDmkNfeTx1QFbZrXR4zBoz++65/RUdHa5gS12xlr9/rB+f8RT+p+9cGrVgM6QEmdMd2/MqQ3EI5xfnS5b4iI9hpazwOU+sxpJ5k+pt6sz/QxDkma/px2qPiZ3KhCno5v1SInUq/KbUl/fDup5TiTAVrHnLR7Z9uPVA6Q7zQ9mSMQaC3CpkzE/NcuvlhqmhtucD81PzjeFIU/SAOSgl+g5FNaThrsPLziENVdWhFtz4aBYaytew1fldUktcqUaFo3Y9jNxwFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4a/wDhGgqmCFJVUcAAAAASUVORK5CYII="
                    alt=""
                  />
                  <div>작성자</div>
                </div>
                <div style={{ border: '2px solid red' }} className="tw-flex-1">
                  <h1>제목</h1>
                  <h1>마지막수정일</h1>
                  <div>좋아요 수 , 댓글수</div>
                </div>
              </div>
            </li>
          </ul>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ul>
            <li>
              <div className="tw-flex" style={{ border: '2px solid blue' }}>
                <div style={{ border: '2px solid red' }}>
                  <img
                    style={{ width: '70px', height: '70px' }}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAAA5OTlISEjk5OSampr8/PzCwsKNjY3q6uqlpaXy8vLFxcVwcHBoaGjLy8sYGBgeHh7e3t5PT08/Pz8QEBAoKCjW1tZUVFTu7u6CgoK2trawsLB8fHy7u7uUlJQsLCwyMjKhoaFaWlojIyOHh4dlZWVERERowodxAAAEu0lEQVR4nO2ca3eiMBCGRQUvVPFCRa1Yaa3+/3+4LpNgvdSSMEim533O2S824cyQZG4ZttUCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGiKbs8fzY9xOz7OR36v27Q43LysX70r0pemheKj279Rj+j/jZUcjO6rlzMaNC1edfoP9MvXsWkBK5JML/WZLrLF1U+TpGkhqzD8psl8vU0GwenHYJD0vubf/jJsWkx7zicw3lwfuMGwcz6NjUjHwFJr8Hl/IyafesDyyZIxoRWMox+HJLFkFcdK+PeHo97VqPGTpGJEi/7zAhJRqRfhID3lCla/jlxNaGjvCVIxEir397uCJxWVgwxrl4qTAwldLu7sCjyKLyRz2ezBcLgLtHOJy4ecZJbaNUrEzFsu8M5gxi6f8VaTPPxkpfzEdyJZi0jifhrNWRq/lCYZW0gbSTKn5Atjw1mxIJ9I4YxvOMsXFNhQVjgznDUTlClmpq6C2Imxpl3LxRgZxHnNQlZxYzxvk8+TUJYaWno2ejMSqlJrS7NPTmZdg0Tc0HmymJjPS9nl4WdcSUMJ7iJPficWEydS4rZDpTWUoGG1cyhhl6Z/3tL0rcJSHZhKuGyjEsbWeN5WTCFjZum5vyzX/vmEU7vcIk9JpiJS4HmF/HBei0TcfOSymt60UI7/UYtE3NBqLAKjSUEm5hi2dMXbzCqSJRWR4rd0LrswmpNZ5s3NEHjGyaxq2jDb2Q1CtsYrc3lIDDxBduY/4d7Q9JOD2YtZQh25lQ4yKZwREbEVqE6ZcpZDHUKzq5ymUff4pZZlo8aKCNjOqIvrEgZVmSVRd9w5WvDfkozUk2ZHC3RjaftRoX628MyMklPo1fH8n05YWLTXSihe3LDZafG9/fCepwv9STFiJyVeOzOLve+8rq+vXKL0YoAXC0krNL53SzpMwjAMTv+ij3vd7aa3xk2yOvc4H6/UmF63eXvnVuG5mMb9qPi8ohO1ooX3iMVpxFlHId0mOkbxJlRSfNv/qN+eDEyvMDkiDE5xBNeFAX053NXvUIQxwVr/JuAwahc3vdhxq22aXWiXpduL9DHSx9N516+bnzs3Xj4Ik43//pV+vfubJLxxkKE+jY63Q+stahOjaAfp9EbdVhJSvx7zO4+nMVMi2jZU6I+I3A1vlNG3T4SUihNXCzbj6qZCGSpH77pV+anaPbUKWJ0sSoUUq7Wr7bCArgReXSzaqD1aNXoecOyEWki4tpcKa91r4aM0iaPmSbXWI8OTWFFfcnG0h6qPhFyrLnYYw2YK3jssz2KDmkNfeTx1QFbZrXR4zBoz++65/RUdHa5gS12xlr9/rB+f8RT+p+9cGrVgM6QEmdMd2/MqQ3EI5xfnS5b4iI9hpazwOU+sxpJ5k+pt6sz/QxDkma/px2qPiZ3KhCno5v1SInUq/KbUl/fDup5TiTAVrHnLR7Z9uPVA6Q7zQ9mSMQaC3CpkzE/NcuvlhqmhtucD81PzjeFIU/SAOSgl+g5FNaThrsPLziENVdWhFtz4aBYaytew1fldUktcqUaFo3Y9jNxwFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4a/wDhGgqmCFJVUcAAAAASUVORK5CYII="
                    alt=""
                  />
                  <div>작성자</div>
                </div>
                <div style={{ border: '2px solid red' }} className="tw-flex-1">
                  <h1>제목</h1>
                  <h1>마지막수정일</h1>
                  <div>좋아요 수 , 댓글수</div>
                </div>
              </div>
            </li>
          </ul>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ul>
            <li>
              <div className="tw-flex" style={{ border: '2px solid blue' }}>
                <div style={{ border: '2px solid red' }}>
                  <img
                    style={{ width: '70px', height: '70px' }}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAAA5OTlISEjk5OSampr8/PzCwsKNjY3q6uqlpaXy8vLFxcVwcHBoaGjLy8sYGBgeHh7e3t5PT08/Pz8QEBAoKCjW1tZUVFTu7u6CgoK2trawsLB8fHy7u7uUlJQsLCwyMjKhoaFaWlojIyOHh4dlZWVERERowodxAAAEu0lEQVR4nO2ca3eiMBCGRQUvVPFCRa1Yaa3+/3+4LpNgvdSSMEim533O2S824cyQZG4ZttUCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGiKbs8fzY9xOz7OR36v27Q43LysX70r0pemheKj279Rj+j/jZUcjO6rlzMaNC1edfoP9MvXsWkBK5JML/WZLrLF1U+TpGkhqzD8psl8vU0GwenHYJD0vubf/jJsWkx7zicw3lwfuMGwcz6NjUjHwFJr8Hl/IyafesDyyZIxoRWMox+HJLFkFcdK+PeHo97VqPGTpGJEi/7zAhJRqRfhID3lCla/jlxNaGjvCVIxEir397uCJxWVgwxrl4qTAwldLu7sCjyKLyRz2ezBcLgLtHOJy4ecZJbaNUrEzFsu8M5gxi6f8VaTPPxkpfzEdyJZi0jifhrNWRq/lCYZW0gbSTKn5Atjw1mxIJ9I4YxvOMsXFNhQVjgznDUTlClmpq6C2Imxpl3LxRgZxHnNQlZxYzxvk8+TUJYaWno2ejMSqlJrS7NPTmZdg0Tc0HmymJjPS9nl4WdcSUMJ7iJPficWEydS4rZDpTWUoGG1cyhhl6Z/3tL0rcJSHZhKuGyjEsbWeN5WTCFjZum5vyzX/vmEU7vcIk9JpiJS4HmF/HBei0TcfOSymt60UI7/UYtE3NBqLAKjSUEm5hi2dMXbzCqSJRWR4rd0LrswmpNZ5s3NEHjGyaxq2jDb2Q1CtsYrc3lIDDxBduY/4d7Q9JOD2YtZQh25lQ4yKZwREbEVqE6ZcpZDHUKzq5ymUff4pZZlo8aKCNjOqIvrEgZVmSVRd9w5WvDfkozUk2ZHC3RjaftRoX628MyMklPo1fH8n05YWLTXSihe3LDZafG9/fCepwv9STFiJyVeOzOLve+8rq+vXKL0YoAXC0krNL53SzpMwjAMTv+ij3vd7aa3xk2yOvc4H6/UmF63eXvnVuG5mMb9qPi8ohO1ooX3iMVpxFlHId0mOkbxJlRSfNv/qN+eDEyvMDkiDE5xBNeFAX053NXvUIQxwVr/JuAwahc3vdhxq22aXWiXpduL9DHSx9N516+bnzs3Xj4Ik43//pV+vfubJLxxkKE+jY63Q+stahOjaAfp9EbdVhJSvx7zO4+nMVMi2jZU6I+I3A1vlNG3T4SUihNXCzbj6qZCGSpH77pV+anaPbUKWJ0sSoUUq7Wr7bCArgReXSzaqD1aNXoecOyEWki4tpcKa91r4aM0iaPmSbXWI8OTWFFfcnG0h6qPhFyrLnYYw2YK3jssz2KDmkNfeTx1QFbZrXR4zBoz++65/RUdHa5gS12xlr9/rB+f8RT+p+9cGrVgM6QEmdMd2/MqQ3EI5xfnS5b4iI9hpazwOU+sxpJ5k+pt6sz/QxDkma/px2qPiZ3KhCno5v1SInUq/KbUl/fDup5TiTAVrHnLR7Z9uPVA6Q7zQ9mSMQaC3CpkzE/NcuvlhqmhtucD81PzjeFIU/SAOSgl+g5FNaThrsPLziENVdWhFtz4aBYaytew1fldUktcqUaFo3Y9jNxwFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4a/wDhGgqmCFJVUcAAAAASUVORK5CYII="
                    alt=""
                  />
                </div>
                <div style={{ border: '2px solid red' }} className="tw-flex-1">
                  <h1>상품명</h1>
                  <h1>가격</h1>
                </div>
              </div>
            </li>
          </ul>
        </CustomTabPanel>
      </Box>
    </>
  );
}

export default SearchPage;
