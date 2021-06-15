import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const renderDatePicker = ({ input, placeholder, minDate, maxDate }) => (
  <DatePicker
    className="plus-icon"
    dateFormat="dd/MM/yyyy"
    selected={input.value ? new Date(input.value) : null}
    onChange={input.onChange}
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
);

export default renderDatePicker;
