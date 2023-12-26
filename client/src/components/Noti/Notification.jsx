import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = ({ listMessage }) => {
  const [listMess, setListMess] = useState([]);
  const [notificationsShown, setNotificationsShown] = useState(false);

  const notify = () => {
    if (!notificationsShown && listMess.length > 0) {
      // Iterate over the updated listMess and show notifications
      listMess.forEach(item => {
        toast.warn(item, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });

      // Set the flag to true so that notifications won't be shown again
      setNotificationsShown(true);
    }
  };

  useEffect(() => {
    // Automatically trigger notifications when the component mounts
    notify();
  }, [listMess, notificationsShown]);

  // This useEffect is optional and depends on your use case
  useEffect(() => {
    // Update the listMess whenever listMessage prop changes
    setListMess(listMessage);
  }, [listMessage]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Notification;