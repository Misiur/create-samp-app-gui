const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Project name is required';
  }

  if (!values.folder) {
    errors.folder = 'Project folder is required';
  }

  return errors;
};

export default {
  validate,
};
