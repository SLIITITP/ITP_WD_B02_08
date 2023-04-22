import React, { useState } from 'react';
import axios from 'axios';

function EmailSender() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/send-emails');
      setIsLoading(false);
      setIsSent(true);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading || isSent}>
        {isLoading ? 'Sending...' : isSent ? 'Sent!' : 'Send Emails'}
      </button>
    </div>
  );
}

export default EmailSender;
