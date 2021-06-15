import React, { useState } from 'react';
import PhoneForm from './PhoneForm';
import CodeForm from './CodeForm';

const PhoneAuth = ({
  match: {
    params: { eventId },
  },
}) => {
  const [stageOneCompleted, setStageOneCompleted] = useState(false);

  return (
    <div>
      <PhoneForm
        stageOneCompleted={stageOneCompleted}
        setStageOneCompleted={setStageOneCompleted}
        eventId={eventId}
      />
      {stageOneCompleted && (
        <CodeForm
          setStageOneCompleted={setStageOneCompleted}
          eventId={eventId}
          origin="guestAuth"
        />
      )}
      ;
    </div>
  );
};

export default PhoneAuth;
