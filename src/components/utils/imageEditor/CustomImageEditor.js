import React, { useState, useRef, useEffect } from 'react';
import ImageEditor from '@toast-ui/react-image-editor';
import 'tui-image-editor/dist/tui-image-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import './imageEditor.css';
import { dataURLtoBlob, replaceBtns } from './utils';

const CustomImageEditor = ({ onImageSave }) => {
  const [pictures, setPictures] = useState(
    localStorage.getItem('postPictures')
      ? JSON.parse(localStorage.getItem('postPictures'))
      : []
  );

  const picturesRef = useRef([]);

  const editorRef = useRef(null);

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    const rootElement = editorRef.current.getRootElement();

    addListenersToPictures(editorInstance);
    replaceBtns(editorRef);

    rootElement
      .querySelector('.tui-image-editor-save-btn')
      .addEventListener('click', processSaveImage);
  }, [pictures]);

  const addListenersToPictures = (editorIns) => {
    picturesRef.current.map((elRef) =>
      elRef.addEventListener('click', () => {
        const imgSource = elRef.src.replace(/^https:\/\//i, 'http://');
        editorIns.loadImageFromURL(imgSource, 'photo');
      })
    );
  };

  const processSaveImage = () => {
    const editorInstance = editorRef.current.getInstance();
    const blob = dataURLtoBlob(editorInstance.toDataURL());
    onImageSave(blob);
  };

  const theme = {
    'common.bi.image':
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fblack-rectangle_16980&psig=AOvVaw3q49RX_0Q-vjrMmxfB0Kj4&ust=1622219028510000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi19Pyi6vACFQAAAAAdAAAAABAI',
    'common.bisize.width': '50px',
    'common.bisize.height': '30px',
  };

  return (
    <>
      <div>
        {pictures.map((el, i) => (
          <img
            src={el.location}
            key={i}
            ref={(el) => (picturesRef.current[i] = el)}
            alt="event"
          />
        ))}
      </div>
      <ImageEditor
        ref={editorRef}
        includeUI={{
          theme: theme,
          menu: [
            'shape',
            'filter',
            'text',
            'mask',
            'icon',
            'draw',
            'crop',
            'flip',
            'rotate',
          ],
          initMenu: 'filter',
          uiSize: {
            width: '900px',
            height: '700px',
          },
          menuBarPosition: 'top',
          loadImage: {
            path: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            name: 'Blank',
          },
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={false}
      />
    </>
  );
};

export default CustomImageEditor;
