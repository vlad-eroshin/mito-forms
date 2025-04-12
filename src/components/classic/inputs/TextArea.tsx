// <div class="field">
//     <label class="label">Message</label>
//     <div class="control">
//         <textarea class="textarea" placeholder="Textarea"></textarea>
//     </div>
// </div>
import React from 'react';
import { FormInputFieldProps } from '../../FormInputField';
import { InputField } from '../../../types';
import { useChangeHandler } from '../../hooks';
import { getFieldId } from '../../utils';
import 'bulma/bulma.scss';

export const TextArea: React.FunctionComponent<FormInputFieldProps> = ({
                                                                         config,
                                                                         onChange,
                                                                         value,
                                                                         fieldIndex
                                                                       }) => {
  const fieldConfig = config as InputField;
  const handleChange = useChangeHandler(fieldConfig, onChange);
  const inputId = getFieldId(config, fieldIndex);
  return (
    <div className={'field'}>
      <label className="label mt-input-label" htmlFor={inputId}>{config.label}</label>
      <div className={'control'}>
                <textarea
                  id={inputId}
                  className="input mt-input-text-field"
                  data-testid={inputId}
                  area-label={fieldConfig.label}
                  value={(value as string) ?? ''}
                  placeholder={fieldConfig.placeHolderText ?? 'Place holder'}
                  required={fieldConfig.required}
                  onChange={handleChange}
                />
      </div>
    </div>
  );
};

TextArea.displayName = 'TextArea';