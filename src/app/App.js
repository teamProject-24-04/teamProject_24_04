// App.js 또는 index.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductPage from './ProductPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/products" component={ProductPage} />
        {/* 다른 페이지에 대한 라우팅 설정 */}
      </Switch>
    </Router>
  );
};

export default App;
