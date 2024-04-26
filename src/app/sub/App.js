// App.js 또는 라우팅을 설정하는 파일에서
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './ProductList'; // ProductList 컴포넌트의 경로에 맞게 수정해주세요.

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/sub" component={ProductList} />
        {/* 다른 라우트들도 필요하다면 여기에 추가할 수 있습니다. */}
      </Switch>
    </Router>
  );
};

export default App;
