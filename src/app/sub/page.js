// App.js

'use client';
import React, { useState } from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import RootTheme from '../theme';

import ProductList from './ProductList'; // 추가
import ProductDetails from './ProductDetails'; // 추가
import PaymentPage from './PaymentPage';
import TossPaymentPage from './tossPaymentPage';
import '../globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  const [isPressed1, setIsPressed1] = useState(true);
  const [isPressed2, setIsPressed2] = useState(false);

  const handleButtonClick1 = () => {
    setIsPressed1(true);
    setIsPressed2(false);
  };

  const handleButtonClick2 = () => {
    setIsPressed1(false);
    setIsPressed2(true);
  };

  const youtubers = [
    /* Define your youtubers array here */
  ];

  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/" exact>
            {/* ProductList로 변경 */}
            <ProductList />
          </Route>
          {/* ProductDetails 추가 */}
          <Route path="/product-details/:id" component={ProductDetails} />
          <Route exact path="/toss-payment" component={TossPaymentPage} />
          <Route path="/PaymentPage/:id" component={PaymentPage} />
        </Switch>
      </Container>
    </Router>
  );
}

export default function themeApp() {
  const theme = RootTheme();

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  );
}
