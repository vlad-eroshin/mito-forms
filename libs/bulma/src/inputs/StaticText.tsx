import React from 'react';
import { FormInputFieldProps } from '../../../core/src/FormInputField';
import { InputField } from '../../../core/src/types';
import { getFieldId } from '../../../core/src/utils';
import 'bulma/bulma.scss';
import { BulmaField } from './BulmaField';

export const StaticText: React.FunctionComponent<FormInputFieldProps> = props => {
  const { config, value, fieldIndex } = props;
  const fieldConfig = config as InputField;
  const inputId = getFieldId(config, fieldIndex);
  return (
    <BulmaField
      {...props}
      id={inputId}
      config={fieldConfig}
      control={
        <div
          id={inputId}
          className="mt-static-text"
          data-testid={inputId}
          area-label={fieldConfig.label}
        >{`${value}`}</div>
      }
    />
  );
};
