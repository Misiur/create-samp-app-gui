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
});

const Processing = ({ nextStep, currentStep }) => (
  <div>
    <h1 className="wizard__title">Processing</h1>
    <div className="wizard__fields">
      
    </div>
    <div className="wizard__navigation">
      <button className="wizard__cancel button" type="button">
        Cancel
      </button>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(Processing));
