import React, { Component } from 'react';
import { connect } from 'react-redux';

import Server from '../../forms/Server.js';

const mapStateToProps = state => ({
  step: state.wizard.step,
});

class Wizard extends Component {
  renderStep = () => {
    switch(this.props.step) {
      case 1: {
        return <Server />;
      }
      default: {
        return <Server />;
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
