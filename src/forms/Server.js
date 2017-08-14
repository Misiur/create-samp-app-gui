import React, { Component } from 'react';
import { reduxForm, Field, formValues } from 'redux-form';
import { connect } from 'react-redux';

import { setStep as setStepAction } from '../ducks';

const mapStateToProps = state => ({
  initialValues: state.wizard,
  currentStep: state.wizard.step,
});

const mapDispatchToProps = dispatch => ({
  setStep: step => dispatch(setStepAction(step)),
  nextStep: currentStep => dispatch(setStepAction(currentStep + 1)),
  previousStep: currentStep => dispatch(setStepAction(currentStep - 1)),
});

class Server extends Component {
  handleNext = () => {
    const { currentStep, nextStep, setStep, platform } = this.props;

    if (platform === 'windows') {
      return nextStep(currentStep);
    }

    return setStep(currentStep + 3);
  }

  render() {
    const { nextStep, previousStep, currentStep } = this.props;

    return (
      <div>
        <h1 className="wizard__title">Select server version</h1>
        <div className="wizard__fields">
          <h2>Server version</h2>
          <div className="field">
            <label htmlFor="server" className="field__label">0.3.7-R2-1</label>
            <Field
              className="field__checkbox"
              name="server"
              type="checkbox"
              component="input"
              value="0.3.7-R2-1"
              disabled
            />
          </div>
          <div className="field">
            <label htmlFor="server" className="field__label">Remove default filterscripts and includes?</label>
            <Field
              className="field__checkbox"
              name="delete"
              type="checkbox"
              component="input"
              value="1"
            />
          </div>
        </div>
        <div className="wizard__navigation">
          <button className="wizard__previous button" type="button" onClick={() => previousStep(currentStep)}>
            Previous
          </button>
          <button className="wizard__next button" type="button" onClick={this.handleNext}>
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
  platform: 'platform',
})(Server)));
