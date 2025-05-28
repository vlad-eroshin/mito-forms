import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FieldsetProps } from '@mito-forms/core';
import React, { useMemo } from 'react';
import './BulmaFieldset.scss';
import 'bulma/bulma.scss';

export const BulmaMultiColumnFieldset: React.FC<FieldsetProps> = ({
  legend,
  children,
  collapsible,
  collapsed,
  onCollapse,
  config,
}) => {
  const nCols = config?.customProps?.columns || 2;
  const trigger = useMemo(() => {
    return collapsible ? (
      <a onClick={onCollapse} className="icon">
        {collapsed ? (
          <FontAwesomeIcon icon={faAngleRight} />
        ) : (
          <FontAwesomeIcon icon={faAngleDown} />
        )}
      </a>
    ) : (
      <></>
    );
  }, [collapsed, collapsible, onCollapse]);

  return (
    <fieldset className={'mf-fieldset'}>
      {(legend || collapsible) && (
        <legend className="mf-legend">
          {trigger}
          {legend}
        </legend>
      )}
      <div className={`fieldset-content fixed-grid has-${nCols}-cols`}>
        <div className="grid">{children}</div>
      </div>
    </fieldset>
  );
};
