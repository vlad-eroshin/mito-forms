import { LoadingComponentProps } from '../../types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './LoadingIndicator.scss';
import { SizeProp } from '@fortawesome/fontawesome';

export const LoadingIndicator: React.FunctionComponent<LoadingComponentProps> = ({
                                                                                   className,
                                                                                   loadingText,
                                                                                   size = 'small'
                                                                                 }) => {
  const iconSize: SizeProp = size === 'medium' ? '2x' : size === 'large' ? '3x' : '1x';
  return <div className={className}>
    <FontAwesomeIcon className={'mf-loading-spinner'} size={iconSize}
                     icon={faSpinner} />&nbsp;{loadingText || 'Loading...'}
  </div>;
};