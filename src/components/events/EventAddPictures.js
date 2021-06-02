import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const FileUpload = (props) => {
  const [state, setState] = useState([]);
  //const classes = useStyles({})

  const eventId = props.match.params.eventId;
  return (
    <div>
      <section id="upload">
        <FilePond
          files={state}
          allowMultiple={true}
          server={`http://localhost:3002/api/collections/${eventId}/upload`}
          onupdatefiles={(items) => {
            setState(items.map((item) => item.file));
          }}
        />
      </section>
      <div>
        <Link to={`/`} className="ui primary button">
          Complete
        </Link>
      </div>
    </div>
  );
};

export default FileUpload;
