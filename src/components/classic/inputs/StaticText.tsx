import React from 'react';
import { FormInputFieldProps } from '../../FormInputField';
import { InputField } from '../../../types';
import { getFieldId } from '../../utils';
import 'bulma/bulma.scss';

export const StaticText: React.FunctionComponent<FormInputFieldProps> = ({
                                                                           config,
                                                                           value,
                                                                           fieldIndex
                                                                         }) => {
  const fieldConfig = config as InputField;
  const inputId = getFieldId(config, fieldIndex);
  return (
    <div className={'field'}>
      {fieldConfig.label && <label className={'label'} htmlFor={inputId}>{fieldConfig.label}</label>}
      <div
        id={inputId}
        className="mt-static-text"
        data-testid={inputId}
        area-label={fieldConfig.label}
      >{`${value}`}</div>
    </div>
  );
};