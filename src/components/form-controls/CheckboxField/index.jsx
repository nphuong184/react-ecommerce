import React from 'react';
import PropTypes from 'prop-types';
import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText } from '@material-ui/core';
import { Controller } from 'react-hook-form';

CheckboxField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function CheckboxField(props) {
  const { name, label, form, disable } = props;
  const { errors } = form;
  const errorMessage = errors[name]?.message;
  const hasError = !!errorMessage;
  return (
    <Box mt={1} mb={2}>
      <FormControl error={hasError}>
        <Controller
          name={name}
          control={form.control}
          render={({ value, onChange, onBlur }) => (
            <FormControlLabel
              control={
                <Checkbox
                  name={name}
                  checked={value}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  disable={disable}
                />
              }
              label={label}
            />
          )}
        />
        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    </Box>
  );
}

export default CheckboxField;
