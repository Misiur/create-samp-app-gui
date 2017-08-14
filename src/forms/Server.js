import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { setStep } from '../ducks';

const mapStateToProps = state => ({
  initialValues: state.wizard,
  currentStep: state.wizard.step,
});

const mapDispatchToProps = dispatch => ({
  nextStep: currentStep => dispatch(setStep(currentStep + 1)),
  previousStep: currentStep => dispatch(setStep(currentStep - 1)),
});

const Server = ({ nextStep, previousStep, currentStep }) => (
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
    </div>
    <div className="wizard__navigation">
      <button className="wizard__previous button" type="button" onClick={() => previousStep(currentStep)}>
        Previous
      </button>
      <button className="wizard__next button" type="button" onClick={() => nextStep(currentStep)}>
        Next
      </button>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(Server));
