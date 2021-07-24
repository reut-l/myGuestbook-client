import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import GalleryBtns from './GalleryBtns';
import { fetchPostsOfEvent } from '../../../actions';

const Gallery = ({ eventId, posts, fetchPostsOfEvent }) => {
  const [images, setImages] = useState([]);
  const [imagesRendered, setImagesRendered] = useState(false);

  useEffect(() => {
    fetchPostsOfEvent(eventId);
  }, []);

  useEffect(() => {
    if (posts.length > 0 && imagesRendered === false) {
      updateImages();
      setImagesRendered(true);
    }
  }, [posts]);

  const myRenderItem = (post, i) => {
    return (
      <div key={i}>
        <GalleryBtns eventId={eventId} currentPostId={post._id} />
        <img
          src={`http://127.0.0.1:3001/img/posts/${post.image}`}
          alt="event_post"
          className="gallery-img"
        />
      </div>
    );
  };

  const updateImages = () => {
    const imagesArr = posts.map((post, i) => {
      const imageObj = {
        original: `http://127.0.0.1:3001/img/posts/${post.image}`,
        thumbnail: `http://127.0.0.1:3001/img/posts/${post.image}`,
        renderItem: () => myRenderItem(post, i),
      };
      return imageObj;
    });
    setImages(imagesArr);
  };

  return <ImageGallery items={images} additionalClass="gallery" />;
};

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.posts.postsOfCurrentEvent),
  };
};

export default connect(mapStateToProps, { fetchPostsOfEvent })(Gallery);
