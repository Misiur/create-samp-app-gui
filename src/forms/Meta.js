import React, { Component } from 'react';
import { reduxForm, Field, formValues } from 'redux-form';
import { connect, dispatch } from 'react-redux';
import classnames from 'classnames';
import validator from '../validator';
import path from 'path';
import fs from 'fs-extra';

const { dialog } = require('electron').remote;

import { setStep } from '../ducks';

const mapStateToProps = state => ({
  initialValues: state.wizard,
  currentStep: state.wizard.step,
});

const mapDispatchToProps = dispatch => ({
  nextStep: currentStep => dispatch(setStep(currentStep + 1)),
});

const validate = (values) => {
  return validator.validate(values);
};

class Meta extends Component {
  openDialog = (name) => {
    const { change } = this.props;

    dialog.showSaveDialog({
      defaultPath: name,
    }, (filename) => {
      change('folder', path.normalize(filename));
    });
  }

  onSubmit = (values) => {
    fs.ensureDir(values.folder, err => {
      if (err) {
        return alert('Failed trying to create folder');
      }

      this.props.nextStep(this.props.currentStep);
    });
  }

  renderField = ({ type, label, input, placeholder, meta: { touched, error }, onClick, onFocus }) => {
    const hasError = touched && error;

    return (
      <div className={classnames('field', hasError ? 'field--error' : null)}>
        <label htmlFor={input.name} className="field__label">{label}</label>
        <div className="field__box">
          { type === 'file'
            ?
            <button
              className="field__file-button"
              type="button"
              onClick={onClick}
            >
              Select directory
            </button>
            : null
          }
          <div className="field__file-wrapper">
            <input
              className="field__text"
              placeholder={placeholder}
              type="text"
              {...input}
            />
          </div>
          { hasError ? <span>{error}</span> : null }
        </div>
      </div>
    );
  }

  render() {
    const { name, handleSubmit, onSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <h1 className="wizard__title">Select project folder</h1>
        <div className="wizard__fields">
          <Field
            name="name"
            label="Project name"
            type="text"
            component={this.renderField}
          />
          <Field
            name="folder"
            label="Project folder"
            placeholder="C:/Path/to/project"
            type="file"
            component={this.renderField}
            onClick={() => this.openDialog(name)}
          />
          <div className="field">
            <label htmlFor="platform" className="field__label">Target platform</label>
            <Field
              className="field__select"
              name="platform"
              component="select"
            >
              <option value="windows">Windows</option>
              <option value="linux">Linux</option>
              <option value="centos7">CentOS 7</option>
            </Field>
          </div>
        </div>
        <div className="wizard__navigation">
          <button className="wizard__next button" type="submit">
            Next
          </button>
        </div>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(formValues({
  name: 'name',
})(Meta)));
