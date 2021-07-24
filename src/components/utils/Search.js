import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';

const Search = ({ search, placeholder, iconClass }) => {
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
