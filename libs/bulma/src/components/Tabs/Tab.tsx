import { TabProps } from '@mito-forms/core';
import React, { FunctionComponent, MouseEvent, useCallback } from 'react';

type TabPropsExt = Omit<TabProps, 'content'> & {
  onTab: (id: string, event: MouseEvent) => void;
};

export const Tab: FunctionComponent<TabPropsExt> = ({ id, label, disabled, selected, onTab }) => {
  const handleTabClick = useCallback(
    (event: MouseEvent) => {
      onTab(id, event);
    },
    [onTab]
  );
  return (
    <li className={`${disabled ? 'disabled' : ''} ${selected ? 'is-active' : ''}`} data-id={id}>
      <a onClick={handleTabClick}>
        <strong>{label}</strong>
      </a>
    </li>
  );
};
