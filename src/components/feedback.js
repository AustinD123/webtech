import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importing Link for routing
import { FaCog, FaHome, FaUserAlt, FaFileAlt, FaInfoCircle } from 'react-icons/fa';

import './feedback.css';

function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send feedback data to the server
    try {
      const response = await fetch('http://127.0.0.1:3001/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Sending form data as JSON
      });

      const result = await response.json();
      console.log('Feedback Submitted:', result);
      
      if (result.message === 'Feedback saved successfully') {
        setIsSubmitted(true);
      }

      // Optionally clear the form
      setFormData({
        name: '',
        email: '',
        feedback: '',
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div>
      {/* Top Bar with Icons */}
      <div className="top-icons">
        <Link to="/home" className="icon-link">
          <FaHome />
        </Link>
        <Link to="/profile" className="icon-link">
          <FaUserAlt />
        </Link>
      </div>

      {/* Info Icon - Bottom Left */}
      <Link to="/info" className="icon-link info-icon">
        <FaInfoCircle />
      </Link>

      <div className="feedback-container">
        <h1>Feedback Form</h1>

        {isSubmitted ? (
          <div className="feedback-thankyou">
            <h2>Thank you for your feedback!</h2>
            <p>We appreciate you taking the time to share your thoughts with us.</p>
          </div>
        ) : (
          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="feedback">Feedback:</label>
              <textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="Enter your feedback"
                rows="5"
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Feedback;
