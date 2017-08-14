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


const Plugins = ({ nextStep, previousStep, currentStep }) => (
  <div>
    <h1 className="wizard__title">Plugins</h1>
    <div className="wizard__fields">
      <div className="field field--wider">
        <label htmlFor="plugins.streamer" className="field__label">Incognito&apos;s Streamer</label>
        <Field
          className="field__checkbox"
          name="plugins.streamer"
          type="checkbox"
          component="input"
        />
      </div>
      <div className="field field--wider">
        <label htmlFor="plugins.crashdetect" className="field__label">Crashdetect</label>
        <Field
          className="field__checkbox"
          name="plugins.crashdetect"
          type="checkbox"
          component="input"
        />
      </div>
      <div className="field field--wider">
        <label htmlFor="plugins.sscanf" className="field__label">Sscanf</label>
        <Field
          className="field__checkbox"
          name="plugins.sscanf"
          type="checkbox"
          component="input"
        />
      </div>
      <div className="field field--wider">
        <label htmlFor="plugins.mysql" className="field__label">BlueG Mysql</label>
        <Field
          className="field__select"
          name="plugins.mysql"
          component="select"
        >
          <option>None</option>
          <option value="r39">R39</option>
          <option value="r41">R41</option>
        </Field>
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
})(Plugins));
