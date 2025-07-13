import React from 'react';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import type { FormInputFieldProps, InputOption } from '@mito-forms/core';

export const RadioList: React.FunctionComponent<FormInputFieldProps> = ({
  config,
  value,
  onChange,
  options,
}) => {
  const radioOptions = options as InputOption[] | string[] | undefined;

  return (
    <RadioGroup
      value={value as string}
      onValueChange={(newValue) => onChange({ [config.name]: newValue })}
      disabled={config.disabled}
      className="space-y-2"
    >
      {radioOptions?.map((option, index) => {
        const optionValue = typeof option === 'string' ? option : option.value as string;
        const optionLabel = typeof option === 'string' ? option : option.label;
        const optionDisabled = typeof option === 'string' ? false : option.disabled;

        return (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem
              value={optionValue}
              id={`${config.name}-${index}`}
              disabled={optionDisabled}
            />
            <Label
              htmlFor={`${config.name}-${index}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {optionLabel}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};

RadioList.displayName = 'RadioList';
