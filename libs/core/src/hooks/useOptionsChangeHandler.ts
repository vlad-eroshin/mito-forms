import { ChangeEvent, useCallback } from 'react';
import { InputField, InputOption, ParamsMap } from '../types';

export const useOptionsChangeHandler = (
  config: InputField,
  options: InputOption[],
  onChange?: (paramsMap: ParamsMap) => void
) => {
  return useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const valueSelected = e.target.value;
      const selectedOpt = options.find(opt => `${opt.value}` === `${valueSelected}`);
      if (onChange && selectedOpt) {
        onChange({ [config.name]: selectedOpt.value });
      }
    },
    [options, onChange, config.name]
  );
};
