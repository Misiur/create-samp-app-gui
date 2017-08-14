import React, { Component } from 'react';
import { connect } from 'react-redux';

import Meta from '../../forms/Meta';
import Server from '../../forms/Server';
import Compiler from '../../forms/Compiler';
import Includes from '../../forms/Includes';
import Plugins from '../../forms/Plugins';
import Confirm from '../../forms/Confirm';
import Processing from '../../forms/Processing';
import Finished from '../../forms/Finished';

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
      case 8: {
        return <Finished />;
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
