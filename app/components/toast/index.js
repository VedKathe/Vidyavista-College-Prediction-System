import React from 'react';
import { useToasts } from 'react-toast-notifications';

const ToastNotification = ({ content, appearance }) => {
  const { addToast } = useToasts();

  React.useEffect(() => {
    if (content) {
      addToast(content, { appearance, autoDismiss: true });
    }
  }, [content, appearance, addToast]);

  return null; // This component doesn't render anything in the DOM
};

export default ToastNotification;
