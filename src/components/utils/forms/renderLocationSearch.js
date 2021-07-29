import PlacesAutocomplete from 'react-places-autocomplete';

const renderError = ({ error, touched }) => {
  if (touched && error) return <div className="error">{error}</div>;
};

const renderLocationSearch = ({
  input,
  meta,
  placeholder,
  onPlaceFocus,
  onPlaceBlur,
  underlineRef,
}) => {
  return (
    // Using Google Places API to autocomplete optional locations/addresses
    <PlacesAutocomplete {...input}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="places-autocomplete-box">
          <input
            {...getInputProps({
              placeholder: `${placeholder}...`,
              className: 'location-search-input',
              onFocus: onPlaceFocus,
              onBlur: onPlaceBlur,
            })}
          />
          <span ref={underlineRef} className="underline"></span>
          {renderError(meta)}
          <div
            className={`autocomplete-dropdown-container ${
              suggestions.length > 0 ? 'open-dropdown' : ''
            }`}
          >
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion, i) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                  key={i}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default renderLocationSearch;
