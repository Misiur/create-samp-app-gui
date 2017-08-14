import React, { Component } from 'react';
import { connect } from 'react-redux';

import Meta from '../../forms/Meta.js';
import Server from '../../forms/Server.js';
import Compiler from '../../forms/Compiler.js';
import Includes from '../../forms/Includes.js';
import Plugins from '../../forms/Plugins.js';
import Confirm from '../../forms/Confirm.js';
import Processing from '../../forms/Processing.js';

const mapStateToProps = state => ({
  step: state.wizard.step,
});

class Wizard extends Component {
  renderStep = () => {
    switch(this.props.step) {
      case 1: {
        return <Meta />;
      }
      case 2: {
        return <Server />;
      }
      case 3: {
        return <Compiler />;
      }
      case 4: {
        return <Includes />;
      }
      case 5: {
        return <Plugins />;
      }
      case 6: {
        return <Confirm />;
      }
      case 7: {
        return <Processing />;
      }
      default: {
        return <Meta />;
      }
    }
  }

  render() {
    return (
      <div className="site__wizard wizard">
        {this.renderStep()}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Wizard);
