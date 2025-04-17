import React from 'react';
import { FormInputFieldProps } from '../../../FormInputField';
import { InputField } from '../../../../types';
import { getFieldId } from '../../../utils';
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
