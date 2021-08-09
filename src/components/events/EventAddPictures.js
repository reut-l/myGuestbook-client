import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FilePond, registerPlugin } from 'react-filepond';
import history from '../../history';

import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const EventAddPictures = ({
  match: {
    params: { eventId },
  },
}) => {
  const [files, setFiles] = useState([]);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [showSmsBtn] = useState(
    history.location.state ? history.location.state.showSmsBtn : null
  );

  const renderInviteBtn = () => {
    return (
      <div className="btns-box">
        <Link
          to={`/events/${eventId}/sendSms`}
          className="btn btn-action btn-large"
        >
          Send Invitation SMSs
        </Link>
      </div>
    );
  };

  return (
    <div className="middle-container">
      {(uploadCompleted || showSmsBtn) && renderInviteBtn()}
      <div className="uploadEventPicturesArea">
        <FilePond
          files={files}
          allowMultiple={true}
          // Uploading the pictures automatically to AWS current event images collection
          server={`${process.env.REACT_APP_AWS_REKOGNITION_API_URL}/collections/${eventId}/upload`}
          onupdatefiles={setFiles}
          onprocessfiles={() => setUploadCompleted(true)}
          name="photos"
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
