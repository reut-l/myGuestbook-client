import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { sendSmsToGuests } from '../utils/utils';

const EventSendSms = ({ eventId }) => {
  const [sending, setSending] = useState(false);

  const handleSMSClick = async () => {
    setSending(true);
    await sendSmsToGuests(eventId);
    setSending(false);
    history.push('/');
  };

  // Action buttens render function
  const renderActions = () => {
    return (
      <div className="actions-btns">
        <button
          onClick={handleSMSClick}
          className={`btn btn-action ${sending ? 'disabled' : null}`}
        >
          Send SMSs
        </button>
        <Link
          to={{
            pathname: `/events/${eventId}/edit/uploadImages`,
            state: { showSmsBtn: true },
          }}
          className="btn btn-outline"
        >
          Cancel
        </Link>
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
      onDismiss={() =>
        history.push({
          pathname: `/events/${eventId}/edit/uploadImages`,
          state: { showSmsBtn: true },
        })
      }
    />
  );
};

export default EventSendSms;
