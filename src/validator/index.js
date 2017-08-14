import path from 'path';

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Project name is required';
  }

  if (!values.folder) {
    errors.folder = 'Project folder is required';
  } else if (!path.isAbsolute(values.folder)) {
    errors.folder = 'Path must be absolute';
  }

  return errors;
};

export default {
  validate,
};
