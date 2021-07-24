import React from 'react';
import Gallery from './utils/Gallery';

const EventBody = ({ eventId }) => {
  return (
    <>
      <Gallery eventId={eventId} />
    </>
  );
};
export default EventBody;
