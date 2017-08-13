import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Sidebar from './common/components/Sidebar.js';
import Wizard from './common/containers/Wizard.js';

const Main = () => (
  <div className="site">
    <Sidebar />
    <Switch>
      <Route exact match="/" component={Wizard} />
    </Switch>
  </div>
);

export default Main;