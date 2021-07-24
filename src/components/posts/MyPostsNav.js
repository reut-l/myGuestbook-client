import React from 'react';

const MyPostsNav = ({ selectedBtn, toggleDisplay }) => {
  return (
    <div>
      <ul className="slide-nav with-indicator">
        <li
          className={`slide-nav-item ${
            selectedBtn === 'myPosts' ? 'is-active' : ''
          }`}
        >
          <button onClick={(e) => toggleDisplay(e)} id={0}>
            My Posts
          </button>
        </li>
        <li
          className={`slide-nav-item ${
            selectedBtn === 'likedPosts' ? 'is-active' : ''
          }`}
        >
          <button onClick={(e) => toggleDisplay(e)} id={1}>
            My Liked Posts
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MyPostsNav;
