import { FormInputFieldProps, getFieldId, InputField } from '@mito-forms/core';
import React from 'react';

import 'bulma/bulma.scss';

export const StaticText: React.FunctionComponent<FormInputFieldProps> = props => {
  const { config, value, fieldIndex } = props;
  const fieldConfig = config as InputField;
  const inputId = getFieldId(config, fieldIndex);
  return (
    <div
      id={inputId}
      className="mt-static-text"
      data-testid={inputId}
      aria-label={fieldConfig.label}
    >{`${value}`}</div>
  );
};
