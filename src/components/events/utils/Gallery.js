import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import GalleryBtns from './GalleryBtns';
import { fetchPostsOfEvent } from '../../../actions';

const Gallery = ({ eventId, posts, fetchPostsOfEvent }) => {
  const [images, setImages] = useState([]);
  const [imagesRendered, setImagesRendered] = useState(false);

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
    if (posts.length > 0 && imagesRendered === false) {
      updateImages();
      setImagesRendered(true);
    }
  }, [posts, imagesRendered, updateImages]);

  if (images.length > 0)
    return <ImageGallery items={images} additionalClass="gallery" />;

  return null;
};

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.posts.postsOfCurrentEvent),
  };
};

export default connect(mapStateToProps, { fetchPostsOfEvent })(Gallery);
