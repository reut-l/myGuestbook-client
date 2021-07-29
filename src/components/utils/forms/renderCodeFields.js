import React from 'react';
import { Field } from 'redux-form';

const handleChange = async (event, onChange, inputsRef, fieldIndex, submit) => {
  const { maxLength, value } = event.target;

  await onChange(value);

  // When a digit is filled (by that reaching its field maxLength)
  if (value.length === maxLength) {
    // In all the fields except for the last one select the next field and focus it
    if (fieldIndex < 5) {
      const nextfield = inputsRef.current[fieldIndex + 1];

      if (nextfield !== null) {
        nextfield.focus();
      }

      // In the last field, after is filled => submit the form automativally
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
  const fieldIndex = fieldName.split('-')[1];
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

const renderCodeFields = ({ fields, inputsRef, submit }) => (
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
  </div>
);

export default renderCodeFields;
