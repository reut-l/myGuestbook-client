import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const renderError = (error, touched) => {
  if (touched && error) return <div className="error">{error}</div>;
};

const renderPhoneField = ({
  input,
  label,
  meta: { error },
  onPhoneFocus,
  onPhoneBlur,
  underlineRef,
  touched,
}) => {
  const inputStyle = {
    left: '5px',
    width: '200px',
    backgroundColor: 'transparent',
    border: 'none',
    marginBottom: '8px',
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    position: 'relative',
    top: '-14px',
    left: '5px',
  };

  return (
    <div>
      <PhoneInput
        {...input}
        country={'il'}
        inputStyle={inputStyle}
        buttonStyle={buttonStyle}
        placeholder={label}
        onFocus={onPhoneFocus}
        onBlur={onPhoneBlur}
      />
      <span ref={underlineRef} className="underline"></span>
      {renderError(error, touched)}
    </div>
  );
};

export default renderPhoneField;
