import React from 'react';
import { cn } from '../lib/utils';
import type { FieldsetProps } from '@mito-forms/core';

export const FieldsetDecorator: React.FunctionComponent<FieldsetProps> = ({
  legend,
  children,
}) => {
  return (
    <fieldset className="mf-fieldset">
      {legend && (
        <legend className="mf-legend">
          {legend}
        </legend>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </fieldset>
  );
};

FieldsetDecorator.displayName = 'FieldsetDecorator';
