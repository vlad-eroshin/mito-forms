import React from 'react';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import type { FormInputFieldProps } from '@mito-forms/core';

export const CheckBox: React.FunctionComponent<FormInputFieldProps> = ({
  config,
  value,
  onChange,
  label,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={config.name}
        checked={value as boolean}
        onCheckedChange={(checked) => onChange({ [config.name]: checked })}
        disabled={config.disabled}
      />
      {(label || config.label) && (
        <Label
          htmlFor={config.name}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label || config.label}
        </Label>
      )}
    </div>
  );
};

CheckBox.displayName = 'CheckBox';
