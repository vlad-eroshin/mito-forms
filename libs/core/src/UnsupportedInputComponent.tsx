import React from 'react';
import { FormInputFieldProps } from './types';

export const UnsupportedInputComponent: React.FunctionComponent<
  Pick<FormInputFieldProps, 'config'>
> = ({ config }) => {
  return (
    <div className="unsupported-input">
      {`[Unsupported Input Component type (${config.type}): name: (${config.name})]`}
    </div>
  );
};
