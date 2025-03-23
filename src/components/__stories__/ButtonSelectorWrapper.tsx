import React, { useState } from 'react';
import type { ButtonSelectorProps } from '../ButtonSelector/ButtonSelector';
import { ButtonSelector } from '../ButtonSelector/ButtonSelector';

export const ButtonSelectorWrapper: React.FC<ButtonSelectorProps> = ({
                                                                       value,
                                                                       options,
                                                                       buttonSize
                                                                     }) => {
  const [selValue, setSelValue] = useState(value);
  return (
    <ButtonSelector
      options={options}
      value={selValue}
      buttonSize={buttonSize}
      onChange={(val) => {
        setSelValue(val as string | number);
      }}
    />
  );
};

ButtonSelectorWrapper.displayName = `ButtonSelectorWrapper`;
