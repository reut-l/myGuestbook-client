import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
};

const renderPhoneField = ({ input, label, meta }) => {
  return (
    <div>
      <label>{label}</label>
      <PhoneInput
        {...input}
        country="il"
        inputStyle={{ position: 'relative', left: '35px' }}
      />
      {renderError(meta)}
    </div>
  );
};

export default renderPhoneField;
