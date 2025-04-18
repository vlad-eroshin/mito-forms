// <div class="field">
//     <label class="label">Message</label>
//     <div class="control">
//         <textarea class="textarea" placeholder="Textarea"></textarea>
//     </div>
// </div>
import React from 'react';
import { FormInputFieldProps } from '../../../core/src/FormInputField';
import { InputField } from '../../../core/src/types';
import { useChangeHandler } from '../../../core/src/hooks';
import { getFieldId } from '../../../core/src/utils';
import 'bulma/bulma.scss';
import { BulmaField } from './BulmaField';

export const TextArea: React.FunctionComponent<FormInputFieldProps> = props => {
  const { config, onChange, value, fieldIndex, isValid, validationErrors } = props;
  const fieldConfig = config as InputField;
  const handleChange = useChangeHandler(fieldConfig, onChange);
  const inputId = getFieldId(config, fieldIndex);
  return (
    <BulmaField
      {...props}
      id={inputId}
      config={fieldConfig}
      control={
        <textarea
          id={inputId}
          className="input mt-input-text-field"
          data-testid={inputId}
          area-label={fieldConfig.label}
          value={(value as string) ?? ''}
          placeholder={fieldConfig.placeHolderText}
          required={fieldConfig.required}
          onChange={handleChange}
        />
      }
      validationErrors={validationErrors}
      isValid={isValid}
    />
  );
};
