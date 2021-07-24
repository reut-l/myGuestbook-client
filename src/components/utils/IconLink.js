import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconLink = ({ to, previousPath, icon, iconClass }) => {
  return (
    <Link
      to={{
        pathname: to,
        state: {
          previousPath: previousPath,
        },
      }}
    >
      <FontAwesomeIcon icon={icon} className={iconClass} />
    </Link>
  );
};

export default IconLink;
