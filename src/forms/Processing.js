import React, { Component } from 'react';
import { reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import csa from 'create-samp-app';
import values from 'create-samp-app/values';

import { setStep } from '../ducks';

const selector = getFormValues('wizard');

const mapStateToProps = state => ({
  formValues: selector(state),
  currentStep: state.wizard.step,
  mapping: state.wizard.mapping,
});

const mapDispatchToProps = dispatch => ({
  nextStep: currentStep => dispatch(setStep(currentStep + 1)),
  previousStep: currentStep => dispatch(setStep(currentStep - 1)),
});

class Processing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      finished: false,
      error: null,
    };
  }

  componentDidMount() {
    this.startCSA();
  }

  startCSA = () => {
    const { formValues } = this.props;
    const includes = Object.keys(formValues.includes);
    const plugins = Object.keys(formValues.plugins).filter(k => k !== 'mysql');
    let mysql = null;

    if (Object.keys(formValues.plugins).includes('mysql') && formValues.plugins.mysql !== 'none') {
      plugins.push('mysql');
      mysql = formValues.plugins.mysql;
    }

    const options = {
      includes,
      plugins,
      mysql,
      target: formValues.platform,
      delete: !!formValues.delete,
      compiler: formValues.compiler,
      'mysql-static': !!formValues.static,
    };

    try {
      csa(formValues.folder, options)
        .then(() => {
          this.setState({
            finished: true,
          });

          setTimeout(() => this.props.nextStep(this.props.currentStep), 3000);
        })
        .catch((e) => {
          this.setState({
            error: e.message,
          });
        })
      ;
    } catch (e) {
      this.setState({
        error: e.message,
      });
    }
  }

  render() {
    const { previousStep, currentStep } = this.props;

    return (
      <div>
        <h1 className="wizard__title">Processing</h1>
        <div className="wizard__fields">
          { !this.state.finished && !this.state.error ? <h2>In progress...</h2> : null }
          { this.state.finished ? <h2>Finished</h2> : null }
          { this.state.error
            ?
            (
              <div>
                <h2>Error</h2>
                <p>{this.state.error}</p>
                <div className="wizard__navigation">
                  <button className="wizard__previous button" type="button" onClick={() => previousStep(currentStep)}>
                    Previous
                  </button>
                </div>
              </div>
            ) : null }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(Processing));
