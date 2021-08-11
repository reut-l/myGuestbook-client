import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import GalleryBtns from './GalleryBtns';
import { fetchPostsOfEvent } from '../../../actions';

// const MemoImageGallery = React.memo(ImageGallery);

const Gallery = ({
  eventId,
  posts,
  currentEventIsFiltered,
  fetchPostsOfEvent,
}) => {
  const [images, setImages] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const galleryRef = useRef(null);

  // Render function for each gallery page
  const myRenderItem = useCallback((post, i) => {
    return (
      <img
        src={`${process.env.REACT_APP_SERVER_URL}/img/posts/${post.image}`}
        alt="event_post"
        className="gallery-img"
        key={i}
      />
    );
  }, []);

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
    if (posts) updateImages();
  }, [posts, updateImages]);

  const renderCustomControls = () => {
    if (galleryRef.current && posts.length > 0) {
      return (
        <GalleryBtns eventId={eventId} currentPostId={posts[slideIndex]._id} />
      );
    }
  };

  const setIndex = () => {
    const index = galleryRef.current.getCurrentIndex();
    setSlideIndex(index);
  };

  if (images.length > 0)
    return (
      <div>
        <ImageGallery
          items={images}
          additionalClass="gallery"
          ref={galleryRef}
          renderCustomControls={renderCustomControls}
          startIndex={slideIndex}
          onSlide={setIndex}
        />
      </div>
    );
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

export default connect(mapStateToProps, { fetchPostsOfEvent })(Gallery);
