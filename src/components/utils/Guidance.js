import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Guidance = ({ text, icon, animation }) => {
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={7000}
      classNames={`guidance-${animation}`}
    >
      <div className={`guidance-box ${animation}-box`}>
        <p>
          <FontAwesomeIcon icon={icon} className={`${animation}-icon`} />
        </p>
        <p>{text}</p>
      </div>
    </CSSTransition>
  );
};

export default Guidance;
