import React, { useEffect, useState } from 'react';
import './profile.css';

const Profile = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve the username from localStorage or set a default value
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  }, []);

  return (
    <div className="profile-content">
      <div className="padding">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body little-profile text-center">
              <div className="pro-img">
                <img src="/user.jpg" alt="user" />
              </div>
              <h3 className="m-b-0">{username}</h3>
              <p>Coimbatore, Tamilnadu</p>
              <div className="profile-buttons">
                <div className="button-bar">
                  <button className="btn btn-left">
                    Orders
                    <img
                      src="https://img.icons8.com/?size=100&id=15010&format=png&color=000000"
                      alt="arrow"
                      className="arrow-icon"
                      width="30px"
                    />
                  </button>
                </div>
                <div className="button-bar">
                  <button className="btn btn-left">
                    Address / Card Details
                    <img
                      src="https://img.icons8.com/?size=100&id=99266&format=png&color=000000"
                      alt="arrow"
                      className="arrow-icon"
                      width="30px"
                    />
                  </button>
                </div>
                <div className="button-bar">
                  <button className="btn btn-left">
                    Password & Security
                    <img
                      src="https://img.icons8.com/?size=100&id=15010&format=png&color=000000"
                      alt="arrow"
                      className="arrow-icon"
                      width="30px"
                    />
                  </button>
                </div>
                <div className="button-bar">
                  <button className="btn btn-left">
                    Wishlist
                    <img
                      src="https://img.icons8.com/?size=100&id=99266&format=png&color=000000"
                      alt="arrow"
                      className="arrow-icon"
                      width="30px"
                    />
                  </button>
                </div>
                <div className="button-bar">
                  <button className="btn btn-left">
                    Notification
                    <img
                      src="https://img.icons8.com/?size=100&id=15010&format=png&color=000000"
                      alt="arrow"
                      className="arrow-icon"
                      width="30px"
                    />
                  </button>
                </div>
                <div className="button-bar">
                  <button className="btn btn-left">
                    Customer Service
                    <img
                      src="https://img.icons8.com/?size=100&id=99266&format=png&color=000000"
                      alt="arrow"
                      className="arrow-icon"
                      width="30px"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
