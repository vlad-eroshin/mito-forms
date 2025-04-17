import React, { useCallback } from 'react';
import { convertInputOptions, generateReactKey } from '../../../../utils';
import { InputOption } from '../../../../../types';
import 'bulma/bulma.scss';
import './ButtonSelector.scss';
import * as faIcons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome';

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
  buttonSize = 'default',
}) => {
  const convertedOptions = options ? convertInputOptions(options, [`${value}`]) : [];

  const handleClick = useCallback(
    (selection: string | number) => {
      onChange(selection);
    },
    [onChange]
  );

  const getButtonSizeClass = () => {
    switch (buttonSize) {
      case 'small':
        return 'is-small';
      case 'medium':
        return 'is-medium';
      case 'large':
        return 'is-large';
      default:
        return '';
    }
  };

  return (
    <div className="button-selector-group">
      {convertedOptions.map((opt, index) => {
        const icon = opt.params?.icon as string | undefined;
        const isSelected = opt.checked;
        const faIcon = faIcons[icon as keyof typeof faIcons] as unknown as IconProp
        const buttonClasses = [
          'button',
          getButtonSizeClass(),
          isSelected ? 'is-primary' : 'is-light',
          isSelected ? 'is-selected' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={generateReactKey(opt.value as string, opt.label)}
            data-testid={`buttonOpt-${opt.value}-${index}`}
            className={buttonClasses}
            disabled={isSelected}
            onClick={!isSelected ? () => handleClick(opt.value as string | number) : undefined}
          >
            {icon && (
              <>
                <FontAwesomeIcon icon={faIcon} />
                &nbsp;
              </>
            )}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

ButtonSelector.displayName = 'ButtonSelector';
