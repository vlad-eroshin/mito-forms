import { FormInputFieldProps, getFieldId, InputField, useChangeHandler } from '@mito-forms/core';
import React from 'react';

import 'bulma/bulma.scss';

export const TextArea: React.FunctionComponent<FormInputFieldProps> = props => {
  const { config, onChange, value, fieldIndex } = props;
  const fieldConfig = config as InputField;
  const handleChange = useChangeHandler(fieldConfig, onChange);
  const inputId = getFieldId(config, fieldIndex);
  return (
    <textarea
      id={inputId}
      className="textarea"
      data-testid={inputId}
      aria-label={fieldConfig.label}
      value={(value as string) ?? ''}
      placeholder={fieldConfig.placeHolderText}
      required={fieldConfig.required}
      onChange={handleChange}
      disabled={config.disabled}
      rows={config.customProps?.rows as number}
      cols={config.customProps?.cols as number}
    />
  );
};
