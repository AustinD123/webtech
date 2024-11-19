// In a separate file models/Feedback.js

const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  feedback: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const FeedbackModel = mongoose.model('Feedback', FeedbackSchema);

module.exports = FeedbackModel;
