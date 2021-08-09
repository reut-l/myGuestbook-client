import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import GalleryBtns from './GalleryBtns';
import { fetchPostsOfEvent } from '../../../actions';

const Gallery = ({
  eventId,
  posts,
  currentEventIsFiltered,
  fetchPostsOfEvent,
}) => {
  const [images, setImages] = useState([]);

  // Render function for each gallery page
  const myRenderItem = useCallback(
    (post, i) => {
      return (
        <div key={i}>
          <GalleryBtns eventId={eventId} currentPostId={post._id} />
          <img
            src={`${process.env.REACT_APP_SERVER_URL}/img/posts/${post.image}`}
            alt="event_post"
            className="gallery-img"
          />
        </div>
      );
    },
    [eventId]
  );

  // Function to update images and their rendered pages, memoized.
  const updateImages = useCallback(() => {
    const imagesArr = posts.map((post, i) => {
      const imageObj = {
        original: `${process.env.REACT_APP_SERVER_URL}/img/posts/${post.image}`,
        thumbnail: `${process.env.REACT_APP_SERVER_URL}/img/posts/${post.image}`,
        renderItem: () => myRenderItem(post, i),
      };
      return imageObj;
    });
    setImages(imagesArr);
  }, [myRenderItem, posts]);

  useEffect(() => {
    fetchPostsOfEvent(eventId);
  }, [eventId, fetchPostsOfEvent]);

  useEffect(() => {
    if (posts) {
      updateImages();
    }
  }, [posts, updateImages]);

  if (images.length > 0)
    return <ImageGallery items={images} additionalClass="gallery" />;

  if (currentEventIsFiltered)
    return (
      <div className="gallery">
        <div className="gallery-text">
          <p>No matches for this search</p>
        </div>
      </div>
    );

  return null;
};

const mapStateToProps = (state, ownProps) => {
  const { eventId } = ownProps;

  return {
    posts: state.posts.allByEvent[eventId]
      ? Object.values(state.posts.allByEvent[eventId])
      : null,
    currentEventIsFiltered: state.events.filtered[eventId],
  };
};

export default connect(mapStateToProps, { fetchPostsOfEvent })(
  React.memo(Gallery)
);
