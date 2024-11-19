import React from "react";
import { Settings, Home, User, FileText, Info } from "lucide-react"; // Minimalist icon library
import './aboutus.css'; // Importing the CSS file
import {Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
      {/* Top Bar with Icons */}
      <div className="top-icons">
      {/* Link to Home page */}
      <div className="icon-link">
        <Link to="/home">
          <Home className="icon" />
        </Link>
      </div>

      {/* Link to User Profile page */}
      <div className="icon-link">
        <Link to="/profile">
          <User className="icon" />
        </Link>
      </div>

      {/* Link to Feedback page */}
      <div className="icon-link">
        <Link to="/feedback">
          <FileText className="icon" />
        </Link>
      </div>
    </div>

      {/* Main Content */}
      <div className="mainContent">
        <div className="contentBox">
          <h1 className="aboutTitle">ABOUT US</h1>
          <div className="aboutContent">
            <p>
              Welcome to Quickeys, where we're passionate about helping people
              become faster and more efficient typists. Our platform offers an
              engaging way to improve your typing skills through practice and
              friendly competition.
            </p>
            <p>
              Founded by typing enthusiasts, Quickeys provides a suite of tools
              and exercises designed to help users of all skill levels enhance
              their typing speed and accuracy. Whether you're a beginner looking
              to master touch typing or a professional aiming to increase your
              words per minute, we're here to support your journey.
            </p>
            <p>
              Join our community today and discover how improving your typing
              skills can boost your productivity and efficiency in our
              increasingly digital world.
            </p>
          </div>
        </div>
      </div>

      {/* Info Icon */}
      <div className="infoIcon">
        <Info className="icon" />
      </div>
    </div>
  );
};

export default About;
