// import ColorBox from './ColorBox';
import NotFound from 'components/NotFound';
import CartFeature from 'features/Cart';
import ProductFeature from 'features/Product';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../src/components/Headers';
import productApi from './api/productApi';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';

function App() {
  useEffect(() => {
    const fetchProducts = async () => {
      const params = {
        _limit: 5,
      };
      const productList = await productApi.getAll(params);
      console.log(productList);
    };
    fetchProducts();
  }, []);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Redirect from="/home" to="/" exact />
        <Route path="/count" component={CounterFeature} exact />
        <Route path="/" component={ProductFeature} exact />
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
        <Route path="/products" component={ProductFeature} />
        <Route path="/cart" component={CartFeature} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
