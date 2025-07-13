import React from 'react';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';
import type { FormInputFieldProps, InputOption } from '@mito-forms/core';

export const ButtonSelector: React.FunctionComponent<FormInputFieldProps> = ({
  config,
  value,
  onChange,
  options,
}) => {
  const buttonOptions = options as InputOption[] | string[] | undefined;

  const handleClick = (optionValue: string | number) => {
    onChange({ [config.name]: optionValue });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {buttonOptions?.map((option, index) => {
        const optionValue = typeof option === 'string' ? option : option.value as string | number;
        const optionLabel = typeof option === 'string' ? option : option.label;
        const optionDisabled = typeof option === 'string' ? false : option.disabled;
        const isSelected = value === optionValue;

        return (
          <Button
            key={index}
            type="button"
            variant={isSelected ? 'default' : 'outline'}
            size="sm"
            disabled={optionDisabled}
            onClick={() => handleClick(optionValue)}
            className={cn(
              'transition-colors',
              isSelected && 'bg-primary text-primary-foreground'
            )}
          >
            {optionLabel}
          </Button>
        );
      })}
    </div>
  );
};

ButtonSelector.displayName = 'ButtonSelector';
