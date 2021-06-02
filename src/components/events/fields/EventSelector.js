import React from 'react';

const EventSelector = ({ show }) => {
  const style = () => {
    const display = show ? 'block' : 'none';
    return { display };
  };
  return <div style={style()}>Event Selector</div>;
};

export default EventSelector;
