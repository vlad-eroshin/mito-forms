import { ChangeEvent, useCallback, useMemo } from 'react';
import { InputField, InputOption, ParamsMap } from '../../types';

export const useChecklistHandler = (
  config: InputField,
  options: InputOption[],
  onChange?: (paramsMap: ParamsMap) => void
) => {
  const checkedOptionsMap: { [key: string]: boolean | undefined } = useMemo(() => {
    const result: { [key: string]: boolean | undefined } = {};
    options.forEach(opt => {
      result[`${opt.value}`] = opt.checked;
    });
    return result;
  }, [options]);

  return useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const optId = event.target.value;
      checkedOptionsMap[optId] = event.target.checked;
      if (onChange) {
        const result = options
          .filter(opt => checkedOptionsMap[`${opt.value}`])
          .map(opt => opt.value);
        onChange({ [config.name]: result });
      }
    },
    [checkedOptionsMap, config.name, onChange, options]
  );
};
