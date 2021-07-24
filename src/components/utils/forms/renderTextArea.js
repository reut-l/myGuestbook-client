import React from 'react';

const renderTextArea = ({ input, label, meta: { touched, error } }) => (
  <div>
    <div>
      <textarea {...input} placeholder={label} rows="15" cols="28" />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

export default renderTextArea;
