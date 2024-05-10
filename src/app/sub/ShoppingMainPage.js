import React, { useState } from 'react';

import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@mui/material';
import ProductList from './ProductList'; // 추가
import ProductDetails from './ProductDetails'; // 추가
import PaymentPage from './PaymentPage';
import CartPage from './CartPage';

import '../globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ShoppingMainPage() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/" exact>
            <ProductList />
          </Route>
          <Route path="/product-details/:id" component={ProductDetails} />
          <Route path="/PaymentPage/:id" render={(props) => <PaymentPage {...props} />} />
          <Route path="/CartPage">
            <CartPage cart={cart} /> {/* CartPage 컴포넌트에 cart 상태 전달 */}
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default ShoppingMainPage;
