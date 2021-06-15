import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { connect } from 'react-redux';
import { change } from 'redux-form';

const LocationSearchInput = ({ change, initialValue, form }) => {
  const [address, setAddress] = useState(initialValue ? initialValue : '');

  const handleChange = (address) => {
    setAddress(address);
    change(form, 'venue', address);
  };

  const handleSelect = (address) => {
    setAddress(address);
    change(form, 'venue', address);
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Venue or Address...',
              className: 'location-search-input',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
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

export default connect(null, { change })(LocationSearchInput);
