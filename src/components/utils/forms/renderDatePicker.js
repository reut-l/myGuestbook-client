import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const renderError = ({ error, touched }) => {
  if (touched && error) return <div className="error">{error}</div>;
};

const renderDatePicker = ({
  input,
  meta,
  placeholder,
  minDate,
  maxDate,
  onDateFocus,
  onDateBlur,
  underlineRef,
}) => (
  <div className="datepicker-box">
    <DatePicker
      className="plus-icon"
      dateFormat="dd/MM/yyyy"
      selected={input.value ? new Date(input.value) : null}
      onChange={input.onChange}
      onBlur={onDateBlur}
      onFocus={onDateFocus}
      minDate={minDate}
      maxDate={maxDate}
      disabledKeyboardNavigation
      placeholderText={placeholder}
      popperModifiers={{
        flip: {
          behavior: ['bottom'],
        },
        preventOverflow: {
          enabled: true,
        },
      }}
    />
    <span ref={underlineRef} className="underline"></span>
    {renderError(meta)}
  </div>
);

export default renderDatePicker;
