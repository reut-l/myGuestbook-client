import React, { useState, useEffect } from 'react';

const SearchGuests = ({ search, placeholder }) => {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTrem] = useState(term);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTrem(term);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    search(debouncedTerm);
  }, [debouncedTerm]);

  return (
    <div className="ui form">
      <div className="field">
        <i className="search icon"></i>
        <input
          type="text"
          className="input"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder={`${placeholder}...`}
          style={{ width: '400px', display: 'inline-block' }}
        />
      </div>
    </div>
  );
};

export default SearchGuests;
