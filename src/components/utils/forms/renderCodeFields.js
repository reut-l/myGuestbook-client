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

const handleChange = async (event, onChange, inputsRef, fieldIndex, submit) => {
  const { maxLength, value } = event.target;

  await onChange(value);

  if (value.length === maxLength) {
    if (fieldIndex < 5) {
      const nextfield = inputsRef.current[fieldIndex + 1];

      if (nextfield !== null) {
        nextfield.focus();
      }
    } else if (fieldIndex === 5) {
      const field = inputsRef.current[fieldIndex];

      if (field !== null) {
        submit('registerForm');
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
  submit,
}) => {
  const [name, fieldIndex] = fieldName.split('-');
  let fieldIntIndex = parseInt(fieldIndex, 10);
  return (
    <div className="code-form-field">
      <input
        value={value}
        type={type}
        placeholder={label}
        maxLength="1"
        ref={(input) => (inputsRef.current[inputIndex] = input)}
        onChange={(event) =>
          handleChange(event, onChange, inputsRef, fieldIntIndex, submit)
        }
        autoFocus={fieldIntIndex === 0}
        className="code-form-input"
      />
    </div>
  );
};

const renderCodeFields = ({ fields, meta, inputsRef, submit }) => (
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
        submit={submit}
      />
    ))}
    {renderError(meta)}
  </div>
);

export default renderCodeFields;
