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

const Compiler = ({ nextStep, previousStep, currentStep }) => (
  <div>
    <h1 className="wizard__title">Compiler</h1>
    <div className="wizard__fields">
      <div className="field field--wider">
        <label htmlFor="compiler" className="field__label">None</label>
        <Field
          className="field__checkbox"
          name="compiler"
          type="radio"
          component="input"
          value="none"
        />
      </div>
      <div className="field field--wider">
        <label htmlFor="compiler" className="field__label">Standard</label>
        <Field
          className="field__checkbox"
          name="compiler"
          type="radio"
          component="input"
          value="standard"
        />
      </div>
      <div className="field field--wider">
        <label htmlFor="compiler" className="field__label">Zeex&apos;s compiler</label>
        <Field
          className="field__checkbox"
          name="compiler"
          type="radio"
          component="input"
          value="zeex"
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
})(Compiler));
