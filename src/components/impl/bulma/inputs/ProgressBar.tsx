import { FormInputFieldProps } from '../../../FormInputField';
import React from 'react';
import { InputField } from '../../../../types';
import { getFieldId } from '../../../utils';
import { BulmaField } from './BulmaField';

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
