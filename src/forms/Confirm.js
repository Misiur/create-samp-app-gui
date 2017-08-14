import React, { Component } from 'react';
import { reduxForm, formValues } from 'redux-form';
import { connect } from 'react-redux';
import values from 'create-samp-app/values';

import { setStep } from '../ducks';

const mapStateToProps = state => ({
  initialValues: state.wizard,
  currentStep: state.wizard.step,
});

const mapDispatchToProps = dispatch => ({
  nextStep: currentStep => dispatch(setStep(currentStep + 1)),
  previousStep: currentStep => dispatch(setStep(currentStep - 1)),
});


class Confirm extends Component {
  getMappedValue = (needle, haystack) => {
    const found = values[haystack].find(v => v.value === needle);
    return found ? found.name : null;
  }

  getMappedValues = (props) => {
    const mapped = {};
    mapped.platform = {
      label: 'Platform',
      value: this.getMappedValue(props.platform, 'targets'),
    };
    mapped.server = {
      label: 'SA-MP server',
      value: props.server,
    };

    mapped.delete = {
      label: 'Clean defaults',
      value: props.delete ? 'Yes' : 'No',
    };

    if (props.platform === 'windows') {
      mapped.compiler = {
        label: 'Compiler',
        value: this.getMappedValue(props.compiler, 'compilers'),
      };
      mapped.includes = {
        label: 'Includes',
        value: Object.keys(props.includes).map(include => this.getMappedValue(include, 'allIncludes')),
      };
    }

    mapped.plugins = {
      label: 'Plugins',
      value: Object.keys(props.plugins)
        .filter(plugin => plugin !== 'mysql')
        .map(plugin => this.getMappedValue(plugin, 'allPlugins')),
    };

    if (typeof props.plugins.mysql !== 'undefined' && props.plugins.mysql !== 'none') {
      mapped.plugins.value.push(this.getMappedValue('mysql', 'allPlugins'));
      mapped.mysql = {
        label: 'MySQL plugin version',
        value: this.getMappedValue(props.plugins.mysql, 'allMySQL'),
      };

      if (props.platform !== 'windows') {
        mapped['mysql-static'] = {
          label: 'Static mysql lib',
          value: props['mysql-static'] ? 'Yes' : 'No',
        };
      }
    }

    return mapped;
  }

  confirmValues = () => {
    this.props.nextStep(this.props.currentStep);
  }

  render() {
    const { previousStep, currentStep, ...props } = this.props;

    const mapped = this.getMappedValues(props);

    return (
      <div>
        <h1 className="wizard__title">Confirm</h1>
        <div className="wizard__fields">
          <div className="confirmation">
            { Object.keys(mapped).map(key => {
              let value = mapped[key].value;
              if (Array.isArray(mapped[key].value)) {
                value = mapped[key].value.join(', ') || 'None selected';
              }

              return (
                <div key={key} className="confirmation__item">
                  <span className="confirmation__label">{mapped[key].label}</span>
                  <span className="confirmation__value">{value}</span>
                </div>
              );
            }) }
          </div>
        </div>
        <div className="wizard__navigation">
          <button className="wizard__previous button" type="button" onClick={() => previousStep(currentStep)}>
            Previous
          </button>
          <button className="wizard__next button" type="button" onClick={() => this.confirmValues()}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(formValues({
  name: 'name',
  folder: 'folder',
  platform: 'platform',
  server: 'server',
  delete: 'delete',
  compiler: 'compiler',
  includes: 'includes',
  plugins: 'plugins',
  'mysql-static': 'mysql-static',
})(Confirm)));
