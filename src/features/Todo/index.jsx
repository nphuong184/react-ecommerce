import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';
TodoFeature.propTypes = {};
function TodoFeature(props) {
  const math = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={math.path} component={ListPage} exact />
        <Route path={`${math.path}/:todoId`} component={DetailPage} />
      </Switch>
    </div>
  );
}

export default TodoFeature;
