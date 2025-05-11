import { FormInputFieldProps, getFieldId, InputField } from '@mito-forms/core';
import React from 'react';

import { BulmaField } from '../decorators/BulmaField';

export const ProgressBar: React.FunctionComponent<FormInputFieldProps> = props => {
  const { config, value, fieldIndex } = props;
  const fieldConfig = config as InputField;
  const inputId = getFieldId(config, fieldIndex);
  return (
    <BulmaField
      {...props}
      id={inputId}
      config={fieldConfig}
      control={<progress className="progress is-link" value={value as number} max={100} />}
    />
  );
};
