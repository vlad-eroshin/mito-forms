import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormInputFieldProps, getFieldId, InputField } from '@mito-forms/core';
import React, { ChangeEvent, useCallback } from 'react';

import 'bulma/bulma.scss';

export const FileUpload: React.FunctionComponent<FormInputFieldProps> = props => {
  const { config, value, fieldIndex, onChange } = props;
  const fieldConfig = config as InputField;
  const inputId = getFieldId(config, fieldIndex);
  const handleSelectFile = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const selectedFile =
        event.target.files && event.target.files.length > 0 ? event.target.files[0] : undefined;
      if (onChange && selectedFile) {
        onChange({ [fieldConfig.name]: selectedFile });
      }
    },
    [onChange, fieldConfig]
  );
  const fileName = value && typeof value === 'object' ? (value as File).name : '';
  return (
    <div className="file has-name">
      <label className="file-label" htmlFor={inputId}>
        <input
          id={inputId}
          className="file-input"
          type="file"
          name={fieldConfig.name}
          onChange={handleSelectFile}
          disabled={config.disabled}
        />
        <span className="file-cta">
          <span className="file-icon">
            <FontAwesomeIcon icon={faUpload} />
          </span>
          <span className="file-label">{fieldConfig.label}</span>
        </span>
        {value && <span className="file-name">{`${fileName || ''}`}</span>}
      </label>
    </div>
  );
};
