import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import type { FormInputFieldProps, InputOption } from '@mito-forms/core';

export const Selector: React.FunctionComponent<FormInputFieldProps> = ({
  config,
  value,
  onChange,
  options,
  isValid = true,
}) => {
  const selectOptions = options as InputOption[] | string[] | undefined;

  return (
    <Select
      value={value as string}
      onValueChange={(newValue) => onChange({ [config.name]: newValue })}
      disabled={config.disabled}
    >
      <SelectTrigger className={!isValid ? 'border-destructive' : ''}>
        <SelectValue placeholder={config.placeHolderText || 'Select an option'} />
      </SelectTrigger>
      <SelectContent>
        {selectOptions?.map((option, index) => {
          if (typeof option === 'string') {
            return (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            );
          } else {
            return (
              <SelectItem
                key={index}
                value={option.value as string}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            );
          }
        })}
      </SelectContent>
    </Select>
  );
};

Selector.displayName = 'Selector';
