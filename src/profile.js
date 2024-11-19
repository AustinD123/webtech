import React, { useState } from "react";
import "./profile.css";
import { Settings, Home, User, FileText, Edit2, Info, PlusCircle } from "lucide-react";

const profile = () => {
  const [username, setUsername] = useState("JohnDoe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("****");

  return (
    <div className="container">
      {/* Navigation Bar */}
      <div className="navBar">
        <div className="navIcons">
          <div className="navIcon">
            <Home />
          </div>
          <div className="navIcon">
            <FileText />
          </div>
          <div className="navIcon">
            <Settings />
          </div>
          <div className="navIcon">
            <User />
          </div>
        </div>
        <h1 className="logo">Quickeys</h1>
      </div>

      {/* Account Settings */}
      <div className="content">
        <div className="profileContainer">
          <div className="profilePicture">
            <User className="profileIcon" />
          </div>
          <div className="addPicture">
            <PlusCircle className="addIcon" />
            <p className="addText">Add Profile Picture</p>
          </div>
        </div>
        <div className="settingsContainer">
          <h2 className="settingsTitle">Account Settings</h2>
          <div className="settingsItem">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="inputField"
            />
            <Edit2 className="editIcon" />
          </div>
          <div className="settingsItem">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inputField"
            />
            <Edit2 className="editIcon" />
          </div>
          <div className="settingsItem">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputField"
            />
            <Edit2 className="editIcon" />
          </div>
          <div className="settingsPrivacy">
            <span>Private</span>
            <input type="checkbox" className="toggleSwitch" />
          </div>
        </div>
      </div>

      {/* Info Icon */}
      <div className="infoIcon">
        <Info />
      </div>
    </div>
  );
};

export default profile;
