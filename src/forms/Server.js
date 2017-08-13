import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect, dispatch } from 'react-redux';

import { setPage } from '../ducks';

const mapStateToProps = state => ({
  initialValues: state.wizard,
  currentStep: state.wizard.step,
});

const mapDispatchToProps = dispatch => ({
  nextStep: currentStep => dispatch(),
});

const Server = ({ nextStep, currentStep }) => (
  <div>
    <h1 className="wizard__title">SA-MP server</h1>
    <div className="wizard__fields">
      <h2>Server version</h2>
      <div className="field">
        <label htmlFor="server" className="field__label">0.3.7-R2-1</label>
        <Field
          className="field__checkbox"
          name="server"
          type="checkbox"
          component="input"
          disabled
        />
      </div>
    </div>
    <div className="wizard__navigation">
      <button className="wizard__next next" type="button" onClick={() => nextStep(currentStep)}>Next</button>
    </div>
  </div>
);

export default connect(mapStateToProps)(reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(Server));
