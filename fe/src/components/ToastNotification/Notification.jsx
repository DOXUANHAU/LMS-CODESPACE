import React from 'react';
import { message } from 'antd';

// Component Notification
const Notification = ({ type, content, duration = 3 }) => {
  const showMessage = () => {
    switch (type) {
      case 'success':
        message.success(content, duration);
        break;
      case 'error':
        message.error(content, duration);
        break;
      case 'warning':
        message.warning(content, duration);
        break;
      default:
        message.info(content, duration);
        break;
    }
  };

  return (
    <div>
      <button onClick={showMessage}>Show {type} Message</button>
    </div>
  );
};

export default Notification;
