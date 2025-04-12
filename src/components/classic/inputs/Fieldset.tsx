import React, { useMemo } from 'react';
import { FieldsetProps } from '../../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import 'bulma/bulma.scss';

const Fieldset: React.FC<FieldsetProps> = ({ legend, children, collapsible, collapsed, onCollapse }) => {
  const trigger = useMemo(() => {
    return collapsible ? <a onClick={onCollapse} className="icon">
      {collapsed ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleDown} />}
    </a> : <></>;
  }, [collapsed, collapsible]);

  return (
    <fieldset className={'mf-fieldset'}>
      {(legend || collapsible) && <legend className="mf-legend">{trigger}{legend}</legend>}
      <div className="fieldset-content">
        {children}
      </div>
    </fieldset>
  );
};

export default Fieldset;