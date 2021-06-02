import React from 'react';
import { connect } from 'react-redux';
import { fetchPostsOfEvent } from '../../../actions';
import Search from '../../utils/Search';

const SearchGuests = ({ fetchPostsOfEvent, eventId }) => {
  const search = (term) => {
    fetchPostsOfEvent(eventId, term);
  };

  return (
    <Search
      search={search}
      placeholder="search guests (by name, phone or even email)"
    />
  );
};

export default connect(null, { fetchPostsOfEvent })(SearchGuests);
