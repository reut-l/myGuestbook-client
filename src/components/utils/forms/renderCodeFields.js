import React, { createRef } from 'react';
import { findDOMNode } from 'react-dom';
import { Field } from 'redux-form';

const renderError = ({ error }) => {
  if (error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
};

const handleChange = (event, onChange, inputsRef, fieldIndex) => {
  const { maxLength, value } = event.target;

  onChange(value);

  if (value.length === maxLength) {
    if (fieldIndex < 5) {
      const nextfield = inputsRef.current[fieldIndex + 1];

      if (nextfield !== null) {
        nextfield.focus();
      }
    } else if (fieldIndex === 5) {
      const field = inputsRef.current[fieldIndex];

      if (field !== null) {
        field.blur();
      }
    }
  }
};

const renderInsertField = ({
  input: { value, onChange },
  type,
  label,
  fieldName,
  inputIndex,
  inputsRef,
}) => {
  const [name, fieldIndex] = fieldName.split('-');
  let fieldIntIndex = parseInt(fieldIndex, 10);
  return (
    <div
      style={{
        display: 'inline-block',
        width: '38px',
        height: '40px',
        textAlign: 'center',
        marginRight: '5px',
      }}
    >
      <input
        value={value}
        type={type}
        placeholder={label}
        maxLength="1"
        ref={(input) => (inputsRef.current[inputIndex] = input)}
        onChange={(event) =>
          handleChange(event, onChange, inputsRef, fieldIntIndex)
        }
        autoFocus={fieldIntIndex === 0}
      />
    </div>
  );
};

const renderCodeFields = ({ fields, meta, inputsRef }) => (
  <div>
    {fields.map((insert, i) => (
      <Field
        name={insert}
        type="text"
        component={renderInsertField}
        label="•"
        key={i}
        fieldName={`insert-${i}`}
        inputIndex={i}
        inputsRef={inputsRef}
      />
    ))}
    {renderError(meta)}
  </div>
);

export default renderCodeFields;
