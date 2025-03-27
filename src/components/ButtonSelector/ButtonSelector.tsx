import React, { useCallback } from 'react';
import { convertInputOptions, generateReactKey } from '../utils';
import './ButtonSelector.scss';
import { InputOption } from '../../types';
import { Box, Button } from '@mui/material';

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonSelectorProps = {
  options: (InputOption | string)[];
  value?: string | number | undefined;
  buttonSize?: ButtonSize | undefined;
  onChange: (value: string | number | null) => void;
};
export const ButtonSelector: React.FunctionComponent<ButtonSelectorProps> = ({
                                                                               onChange,
                                                                               options,
                                                                               value,
                                                                               buttonSize = 'default'
                                                                             }) => {
  const convertedOptions = options ? convertInputOptions(options, [`${value}`]) : [];

  const handleClick = useCallback(
    (selection: string | number) => {
      onChange(selection);
    },
    [onChange]
  );

  return (
    <Box display="flex">
      <Box className="button-selector">
        {convertedOptions.map((opt, index) => {
          const icon = opt.params?.icon;
          const className = opt.checked ? 'selected' : '';
          const useVal = opt.checked ? 'default' : 'text';
          return (
            <Button
              key={generateReactKey(opt.value as string, opt.label)}
              data-testid={`buttonOpt-${opt.value}-${index}`}
              className={className}
              disabled={opt.checked}
              onClick={!opt.checked ? () => handleClick(opt.value as string | number) : undefined}
            >
              {icon ? (
                <>
                  {/*<Icon icon={icon as IconType} /> &nbsp;*/}
                </>
              ) : (
                <></>
              )}
              {opt.label}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

ButtonSelector.displayName = 'ButtonSelector';
