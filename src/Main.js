import React from 'react';

import Sidebar from './common/components/Sidebar.js';
import Wizard from './common/containers/Wizard.js';
import CloseButton from './common/components/CloseButton';

const remote = require('electron').remote;

const closeWindow = () => {
   remote.getCurrentWindow().close();
};

const Main = () => (
  <div className="site">
    <CloseButton
      onClick={closeWindow}
    />
    <Sidebar />
    <Wizard />
  </div>
);

export default Main;
