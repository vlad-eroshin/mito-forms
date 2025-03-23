import React, { useCallback } from 'react';
import { InputField, ParamsMap } from '../../types';

export const useChangeHandler = (config: InputField, onChange?: (paramsMap: ParamsMap) => void) => {
  return useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (onChange) {
        onChange({ [config.name]: e.target.value });
      }
    },
    [onChange, config]
  );
};
