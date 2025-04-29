import { ChangeEvent, useCallback } from 'react';
import { InputField, ParamsMap } from '../types';

export const useCheckedHandler = (
  config: InputField,
  onChange?: (paramsMap: ParamsMap) => void
) => {
  return useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        debugger;
        onChange({ [config.name]: e.target.checked });
      }
    },
    [onChange, config]
  );
};
