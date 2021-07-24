import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const EventAddPictures = (props) => {
  const [state, setState] = useState([]);

  const eventId = props.match.params.eventId;
  return (
    <div className="middle-container">
      <div className="uploadEventPicturesArea">
        <FilePond
          files={state}
          allowMultiple={true}
          server={`http://localhost:3002/api/collections/${eventId}/upload`}
          onupdatefiles={(items) => {
            setState(items.map((item) => item.file));
          }}
        />
      </div>
      <div className="btns-box">
        <Link to={`/`} className="btn btn-action">
          Complete
        </Link>
      </div>
    </div>
  );
};

export default EventAddPictures;