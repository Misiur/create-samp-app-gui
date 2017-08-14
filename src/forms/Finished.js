import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import { setStep } from '../ducks';

const selector = getFormValues('wizard');

const mapStateToProps = state => ({
  formValues: selector(state),
  currentStep: state.wizard.step,
  mapping: state.wizard.mapping,
});

const mapDispatchToProps = dispatch => ({
  restart: currentStep => dispatch(setStep(1)),
});

const Finished = ({ formValues, restart }) => (
  <div>
    <h1 className="wizard__title">Setup completed</h1>
    <p>Your new project now lives in "{formValues.folder}"<br />Go and build something!</p>
    <div className="wizard__navigation">
      <button className="wizard__cancel button" type="button" onClick={() => restart()}>
        Restart
      </button>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Finished);
