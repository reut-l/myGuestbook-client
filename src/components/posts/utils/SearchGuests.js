import React from 'react';
import { connect } from 'react-redux';
import {
  fetchPostsOfEvent,
  addFilteredEvent,
  removeFilteredEvent,
} from '../../../actions';
import Search from '../../utils/Search';

const SearchGuests = ({
  eventId,
  fetchPostsOfEvent,
  addFilteredEvent,
  removeFilteredEvent,
}) => {
  // Search all posts of events (when term is not set) or by creator of a post (by his partialy or full name/phone/email)
  const search = (term) => {
    if (term !== '') {
      addFilteredEvent(eventId);
    } else {
      removeFilteredEvent(eventId);
    }
    fetchPostsOfEvent(eventId, term);
  };

  return (
    <div className="search-container">
      <Search
        search={search}
        placeholder="search guests"
        iconClass="search-post-field right-btn"
      />
    </div>
  );
};

export default connect(null, {
  fetchPostsOfEvent,
  addFilteredEvent,
  removeFilteredEvent,
})(SearchGuests);
