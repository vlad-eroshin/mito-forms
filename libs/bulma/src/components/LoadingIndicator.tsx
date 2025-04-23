import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingComponentProps } from '@mito-forms/core';
import React from 'react';
import './LoadingIndicator.scss';
import { SizeProp } from '@fortawesome/fontawesome';

export const LoadingIndicator: React.FunctionComponent<LoadingComponentProps> = ({
  className,
  loadingText,
  size = 'small',
}) => {
  const iconSize: SizeProp = size === 'medium' ? '2x' : size === 'large' ? '3x' : '1x';
  return (
    <div className={className || 'mf-loading-indicator'}>
      <FontAwesomeIcon className={'mf-loading-spinner'} size={iconSize} icon={faSpinner} />
      &nbsp;{loadingText}
    </div>
  );
};
