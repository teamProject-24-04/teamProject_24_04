import React from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@mui/material';
import ProductList from './ProductList'; // 추가
import ProductDetails from './ProductDetails'; // 추가
import PaymentPage from './PaymentPage';
import '../globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ShoppingMainPage() {
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

          <Route path="/PaymentPage/:id" component={PaymentPage} />
        </Switch>
      </Container>
    </Router>
  );
}

export default ShoppingMainPage;
