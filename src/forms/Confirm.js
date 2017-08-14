import React from 'react';
import { reduxForm, Field, formValues } from 'redux-form';
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

const Confirm = ({ nextStep, previousStep, currentStep, ...props }) => (
  <div>
    <h1 className="wizard__title">Confirm</h1>
    <div className="wizard__fields">
      {props.name} {props.folder} {props.platform} {props.compiler} {typeof props.includes} {typeof props.plugins}
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
})(formValues({
  name: 'name',
  folder: 'folder',
  platform: 'platform',
  compiler: 'compiler',
  include: 'include',
  plugin: 'plugin',
})(Confirm)));
