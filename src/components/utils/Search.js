import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';

const Search = ({ search, placeholder, iconClass }) => {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTrem] = useState(term);

  // Set a timeout after something was typed in order to reduce unwanted api calls (call the api only when there is a min time pose in typing)
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
  }, [debouncedTerm, search]);

  return (
    <div>
      <div className={iconClass}>
        <FontAwesomeIcon icon="search" className="search-icon" />
        <input
          type="text"
          className="input"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder={`${placeholder}...`}
        />
      </div>
      <CSSTransition
        in={true}
        timeout={5000}
        classNames="search-field-msg-transition"
        unmountOnExit
        appear
      >
        <div className="search-msg">
          Try searching by name, phone or even email
        </div>
      </CSSTransition>
    </div>
  );
};

export default Search;
