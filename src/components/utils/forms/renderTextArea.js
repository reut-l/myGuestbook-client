import React from 'react';

const renderTextArea = ({ input, label, meta: { touched, error } }) => (
  <div>
    <div>
      <textarea {...input} placeholder={label} rows="10" cols="40" />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

export default renderTextArea;
