import React from 'react';
import { reduxForm, Field } from 'redux-form';
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

const libraries = values.allIncludes;

const Includes = ({ nextStep, previousStep, currentStep }) => (
  <div>
    <h1 className="wizard__title">Includes</h1>
    <div className="wizard__fields">
      { libraries.map((library, index) => {
        return <div key={`${library.value}`} className="field">
          <label htmlFor={`includes.${library.value}`} className="field__label">{library.name}</label>
          <Field
            className="field__checkbox"
            name={`includes.${library.value}`}
            type="checkbox"
            component="input"
          />
        </div>
      }) }
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
})(Includes));
