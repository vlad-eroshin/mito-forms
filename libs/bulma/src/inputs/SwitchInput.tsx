import React, { FunctionComponent, useCallback, useRef } from 'react';
import './SwitchInput.scss';

type SwitchInputProps = {
  name?: string;
  value?: string | boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export const SwitchInput: FunctionComponent<SwitchInputProps> = ({
  checked,
  name,
  value,
  onChange,
  disabled,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    if (onChange && inputRef.current) {
      inputRef.current.checked = !inputRef.current.checked;
      const fakeEvent = {
        target: inputRef.current,
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(fakeEvent);
    }
  }, [checked, onChange]);

  return (
    <div className="mf-switch-input">
      <input
        ref={inputRef}
        type="checkbox"
        role="switch"
        value={value as string}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className="slider round" onClick={handleClick}></span>
    </div>
  );
};
