import React, { ChangeEvent, useCallback } from 'react';
import { FormInputFieldProps } from '../../../FormInputField';
import { InputField } from '../../../../types';
import { getFieldId } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import 'bulma/bulma.scss';
import { BulmaField } from './BulmaField';

export const FileUpload: React.FunctionComponent<FormInputFieldProps> = (props) => {
  const {
    config,
    value,
    fieldIndex,
    onChange
  } = props;
  const fieldConfig = config as InputField;
  const inputId = getFieldId(config, fieldIndex);
  const handleSelectFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files.length > 0 ? event.target.files[0] : undefined;
    if (onChange && selectedFile) {
      onChange({ [fieldConfig.name]: selectedFile });
    }
  }, [onChange, fieldConfig]);
  const fileName = value && typeof value === 'object' ? (value as File).name : '';
  return <BulmaField
    {...props}
    id={inputId}
    config={fieldConfig}
    control={
      <div className="file has-name">
        <label className="file-label" htmlFor={inputId}>
          <input id={inputId} className="file-input" type="file" name={fieldConfig.name} onChange={handleSelectFile} />
          <span className="file-cta">
          <span className="file-icon">
            <FontAwesomeIcon icon={faUpload} />
          </span>
          <span className="file-label">{fieldConfig.label}</span>
        </span>
          {value && <span className="file-name">{`${fileName || ''}`}</span>}
        </label>
      </div>
    } />;
};