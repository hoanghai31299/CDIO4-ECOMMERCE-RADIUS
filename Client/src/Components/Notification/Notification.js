import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../GlobalState/UserContext";
import axios from "../../axios";
import "./Notification.css";
function Notification() {
  const { user, setUser } = useContext(UserContext);
  const [idUser, setIdUser] = useState();
  const [notification, setNotification] = useState();
  useEffect(() => {
    setIdUser(user._id);
  }, [user]);
  useEffect(() => {
    axios.get(`/notification/${idUser}`).then((res) => {
      setNotification(res.data.notification);
      console.log(res.data.notification);
    });
  }, []);
  return (
    <div>
      <div className="wrap-notification">
        <div className="notification-list">
          <div className="notification-title">Notification</div>
          {notification &&
            notification.map(({ title, information }) => {
              return (
                <div className="notification-item">
                  <img
                    alt="icon-spider"
                    src="https://res.cloudinary.com/hoanghai/image/upload/v1610604413/Radius-E/ProductDetail-Delete/icon-etc/spider-solid_rwca3a.svg"
                  ></img>
                  <div className="notification-info">
                    <div className="notification-name">{title}</div>
                    <div className="notification-des">{information}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Notification;
