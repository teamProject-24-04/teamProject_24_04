import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@mui/material';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import PaymentPage from './PaymentPage';
import Page from './tosspay/Page'; // 변경된 부분
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
          <Route path="/tosspay/" component={Page} /> {/* 변경된 부분 */}
          <Route path="/CartPage">
            <CartPage cart={cart} />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default ShoppingMainPage;
