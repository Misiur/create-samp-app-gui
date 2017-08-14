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

class Plugins extends Component {
  handlePrevious = () => {
    const { currentStep, previousStep, setStep, platform } = this.props;

    if (platform === 'windows') {
      return previousStep(currentStep);
    }

    return setStep(currentStep - 3);
  }

  renderStaticMysql = () => {
    return (
      <div className="field field--wider">
        <label htmlFor="mysql-static" className="field__label">Statically linked library</label>
        <Field
          className="field__select"
          name="mysql-static"
          component="input"
          type="checkbox"
          value="1"
        />
      </div>
    );
  }

  render() {
    const { nextStep, currentStep, mysql, platform } = this.props;

    return (
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
              <option value="none">None</option>
              <option value="r39">R39</option>
              <option value="r41">R41</option>
            </Field>
          </div>
          { platform !== 'windows' && mysql !== 'none' ? this.renderStaticMysql() : null }
        </div>
        <div className="wizard__navigation">
          <button className="wizard__previous button" type="button" onClick={this.handlePrevious}>
            Previous
          </button>
          <button className="wizard__next button" type="button" onClick={() => nextStep(currentStep)}>
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
  mysql: 'plugins.mysql',
})(Plugins)));
