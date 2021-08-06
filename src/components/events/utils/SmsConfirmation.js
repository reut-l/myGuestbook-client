import React from 'react';
import Modal from '../../Modal';
import { sendSmsToGuests } from '../../utils/utils';

const SmsConfirmation = ({ eventId, setShowConfirmation }) => {
  // Action buttens render function
  const renderActions = () => {
    return (
      <div className="actions-btns">
        <button
          onClick={() => sendSmsToGuests(eventId)}
          className="btn btn-action"
        >
          Send SMSs
        </button>
        <button
          onClick={() => setShowConfirmation(false)}
          className="btn btn-outline"
        >
          Cancel
        </button>
      </div>
    );
  };

  const renderContent = () => {
    return `Are you sure you want to send SMS to your guests?`;
  };

  return (
    <Modal
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => setShowConfirmation(false)}
    />
  );
};

export default SmsConfirmation;
